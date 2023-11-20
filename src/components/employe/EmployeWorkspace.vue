<script setup lang='ts'>
import { computed, onMounted, onUpdated, ref } from 'vue'
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

const props = defineProps<{
    windowId: string
}>()

const { clients } = useClients(props.windowId)
const { window, GetWindowById } = useWindows()

const client = ref<Client | null>(null)

function GetCurrentClient() {
    if (!clients.value?.length) return false

    client.value = clients.value?.shift() as Client
    return true
}

GetWindowById(props.windowId)

const notification_message = ref<string>("")

const isAlertOpened = ref<boolean>(false)
const isConfirmOpened = ref<boolean>(false)
const confirmAnswer = ref<boolean>(false)

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
        const totalTimeInMinutes = Math.floor(serviceTime.value / 60)
        const totalTimeInSeconds = serviceTime.value - totalTimeInMinutes * 60
        notification_message.value = `На обслуживание ушло ${totalTimeInMinutes} минут и ${totalTimeInSeconds} секунд. Завершить?`
    }

    isConfirmOpened.value = true
}

enum Status {
    Waiting,
    HasClients,
    Work
}

const status = ref<Status>(Status.Waiting)

const config = {
    headers: { 'content-type': 'application/json' },
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
}

const serviceTime = ref<number>(0)

async function CompleteService() {
    const data = {
        isBusy: false
    }
    await axios.put(`${WINDOWS_URL}/${window?.value?.id}`, data, config)
        .then(() => status.value = Status.Waiting)
    await axios.delete(`${WINDOWS_URL}/${window?.value?.id}/clients/${client.value?.id}`, config)
        .then(() => {
            client.value = null
            serviceTime.value = 0
            isConfirmOpened.value = false
            Update()
        })
        .catch(error => console.log(error))

}

// Расчет времени обслуживания клиента в секундах
onUpdated(() => {
    if (status.value === Status.Work)
        setInterval(() => {
            serviceTime.value += 1
        }, 1000)
})


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
        <NotificationAlert :message="notification_message"
                           :is-active="isAlertOpened"
                           @close-alert="closeAlert" />
        <NotificationConfirm :message="notification_message"
                             :is-active="isConfirmOpened"
                             @close-confirm="closeConfirm"
                             @accept="applyChanges" />
        <header class="employe__header">
            <h1 class="title">{{ window?.name }}</h1>
            <div class="status"
                 v-show="isRefreshed && status === Status.Waiting">Обновлено
            </div>
            <CurrentTime />
        </header>
        <div class="employe__content">
            <ClientCard :client="client" />
            <div class="employe__actions"
                 v-if="status === Status.Waiting">
                <button class="btn-reset employe__btn employe__btn-relax">Выйти на перерыв</button>
                <button class="btn-reset employe__btn employe__btn-relax">Закончить смену</button>
            </div>
            <div class="employe__actions"
                 v-else-if="status === Status.HasClients">
                <button class="btn-reset employe__btn employe__btn-accept"
                        @click.left="AcceptClient">
                    Принять клиента
                </button>
                <button class="btn-reset employe__btn employe__btn-skip"
                        @click.left="openConfirm">
                    Клиент не пришел
                </button>
                <button class="btn-reset employe__btn employe__btn-relax">Выйти на перерыв</button>
            </div>
            <div class="employe__actions"
                 v-else-if="status === Status.Work">
                <button class="btn-reset employe__btn employe__btn-accept"
                        @click.left="openConfirm">
                    Завершить обслуживание
                </button>
                <button class="btn-reset employe__btn employe__btn-skip"
                        @click.left="DenyClient">
                    Перенаправить в другое окно
                </button>
                <button class="btn-reset employe__btn employe__btn-relax"
                        disabled>Выйти на перерыв</button>
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