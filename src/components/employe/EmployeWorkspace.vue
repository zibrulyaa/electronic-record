<script setup lang='ts'>

//#region Импорты

import { onMounted, ref } from 'vue'
import { onBeforeRouteLeave } from 'vue-router'
import axios from 'axios'

import { useClients } from '@/composables/useClients'
import { useWindows } from '@/composables/useWindows'

import { WINDOWS_URL } from '@/constants'
import type { Client } from '@/types'

import CurrentTime from '../CurrentTime.vue'
import ClientCard from './ClientCard.vue'
import NotificationAlert from './NotificationAlert.vue'
import NotificationConfirm from './NotificationConfirm.vue'
import StopWatch from './StopWatch.vue'

//#endregion

const props = defineProps<{
    windowId: string
}>()

const { clients } = useClients(props.windowId)
const { window, GetWindowById } = useWindows()
const client = ref<Client | null>(null)

enum Status {
    Waiting,
    HasClients,
    Work
}

const status = ref<Status>(Status.Waiting)

const config = {
    headers: { 'content-type': 'application/json' },
}

GetWindowById(props.windowId)

//#region Работа с попапами

const isAlertOpened = ref<boolean>(false)
const isConfirmOpened = ref<boolean>(false)
const confirmAnswer = ref<boolean>(false)

const notification_message = ref<string>("")

const closeAlert = () => {
    isAlertOpened.value = false
}
const closeConfirm = () => {
    notification_message.value = "Действие отменено"
    confirmAnswer.value = false
    isConfirmOpened.value = false
    isAlertOpened.value = true
}
const applyChanges = () => {
    confirmAnswer.value = true
    if (status.value === Status.HasClients)
        DenyClient()
    if (status.value === Status.Work)
        CompleteService()
}
const openConfirm = () => {
    if (status.value === Status.HasClients)
        notification_message.value = "Пропустить клиента?"

    if (status.value === Status.Work) {
        notification_message.value = "Вы уверены что хотите завершить?"
    }


    isConfirmOpened.value = true
}
//#endregion

//#region Работа с клиентами

const StopWatchRef = ref()

function GetCurrentClient() {
    if (!clients.value?.length) return false

    client.value = clients.value?.shift() as Client
    return true
}

async function DenyClient() {
    await axios.delete(`${WINDOWS_URL}/${window?.value?.id}/clients/${client.value?.id}`, config)
        .then(() => {
            client.value = null
            isConfirmOpened.value = false
            Update()
        })
        .catch(error => console.log(error))
}

async function AcceptClient() {
    const data = {
        isBusy: true
    }
    await axios.put(`${WINDOWS_URL}/${window?.value?.id}`, data, config)
        .then(() => status.value = Status.Work)
    StopWatchRef.value.start()
}


async function CompleteService() {
    StopWatchRef.value.stop()

    // Меняем статус окна
    const data = {
        isBusy: false
    }
    await axios.put(`${WINDOWS_URL}/${window?.value?.id}`, data, config)
        .then(() => status.value = Status.Waiting)

    // Отправляем клиента в завершенные обслуживания

    // Убираем клиента из очереди
    await axios.delete(`${WINDOWS_URL}/${window?.value?.id}/clients/${client.value?.id}`, config)
        .then(() => {
            client.value = null
            isConfirmOpened.value = false
            Update()
        })
        .catch(error => console.log(error))

}

//#endregion

//#region Работа с поиском нового клиента

// Проверка на наличие новых клиентов через интервал времени (5 сек)
const isRefreshed = ref<boolean>(false)
const intervalTime = 5000

onMounted(() => {
    setInterval(() => {
        if (!client.value && status.value === Status.Waiting)
            Update()
    }, intervalTime)
})


function Update() {
    isRefreshed.value = false

    if (client.value === null) {
        let hasClient = GetCurrentClient()
        isRefreshed.value = true
        console.log(`Update in window ${props.windowId}`)
        if (hasClient)
            status.value = Status.HasClients
    }

}

//#endregion

// Запрет на переходы по страницам
onBeforeRouteLeave(() => {
    if (status.value === Status.Work) {
        notification_message.value = "Вы не можете никуда перейти, т.к. у вас клиент"
        isAlertOpened.value = true
        return false
    }
})

</script>

<template>
    <div class="employe__workspace">
        <NotificationAlert
            :message="notification_message"
            :is-active="isAlertOpened"
            @close-alert="closeAlert"
        />
        <NotificationConfirm
            :message="notification_message"
            :is-active="isConfirmOpened"
            @close-confirm="closeConfirm"
            @accept="applyChanges"
        />
        <header class="employe__header">
            <h1 class="title">{{ window?.name }}</h1>
            <div
                class="status"
                v-show="isRefreshed && status === Status.Waiting"
            >
                Обновлено
            </div>
            <StopWatch
                ref="StopWatchRef"
                v-show="status === Status.Work"
            />
            <CurrentTime />
        </header>
        <div class="employe__content">
            <ClientCard :client="client" />
            <div
                class="employe__actions"
                v-if="status === Status.Waiting"
            >
                <button class="btn-reset employe__btn employe__btn-relax">Выйти на перерыв</button>
                <button class="btn-reset employe__btn employe__btn-relax">Закончить смену</button>
            </div>
            <div
                class="employe__actions"
                v-else-if="status === Status.HasClients"
            >
                <button
                    class="btn-reset employe__btn employe__btn-accept"
                    @click.left="AcceptClient"
                >
                    Принять клиента
                </button>
                <button
                    class="btn-reset employe__btn employe__btn-skip"
                    @click.left="openConfirm"
                >
                    Клиент не пришел
                </button>
                <button class="btn-reset employe__btn employe__btn-relax">Выйти на перерыв</button>
            </div>
            <div
                class="employe__actions"
                v-else-if="status === Status.Work"
            >
                <button
                    class="btn-reset employe__btn employe__btn-accept"
                    @click.left="openConfirm"
                >
                    Завершить обслуживание
                </button>
                <button
                    class="btn-reset employe__btn employe__btn-skip"
                >
                    Перенаправить в другое окно
                </button>
                <button
                    class="btn-reset employe__btn employe__btn-relax"
                    disabled
                >Выйти на перерыв</button>
            </div>
        </div>
    </div>
</template>

<style lang='scss' scoped>
@import '@/assets/scss/vars';
@import '@/assets/scss/mixins';

.employe {

    // .employe__header

    &__header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 64px;
    }

    // .employe__content

    &__content {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    // .employe__actions

    &__actions {
        display: flex;
        flex-direction: column;
        gap: 20px;
        max-width: 493px;
        width: 100%;
    }

    // .employe__btn

    &__btn {
        width: 100%;
        border-radius: 4px;
        padding: 24px;
        color: $white;
        font-size: 32px;
        font-weight: 400;
    }

    // .employe__btn-accept

    &__btn-accept {
        background-color: $green;
    }

    // .employe__btn-skip

    &__btn-skip {
        background-color: $red;
    }

    // .employe__btn-relax

    &__btn-relax {
        background-color: $accent;
    }
}
</style>