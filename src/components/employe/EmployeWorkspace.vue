<script setup lang='ts'>
import { onMounted, onUpdated, ref } from 'vue'

import { useClients } from '@/composables/useClients'
import { useWindows } from '@/composables/useWindows'

import CurrentTime from '../CurrentTime.vue'
import ClientCard from './ClientCard.vue'
import axios from 'axios'
import { WINDOWS_URL } from '@/constants'

const props = defineProps<{
    windowId: string
}>()

const { client, getCurrentClientAtWindow } = useClients(props.windowId)
const { window, GetWindowById } = useWindows()

GetWindowById(props.windowId)

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
    if (confirm("Пропустить?"))
        await axios.delete(`${WINDOWS_URL}/${window?.value?.id}/clients/${client.value?.id}`, config)
            .then(() => {
                client.value = null
                Update()
            })
            .catch(error => console.log(error))
    else alert("Действие отменено")
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
    const totalTimeInMinutes = Math.floor(serviceTime.value / 60)
    const totalTimeInSeconds = serviceTime.value - totalTimeInMinutes * 60
    alert(`На обслуживание ушло ${totalTimeInMinutes} минут и ${totalTimeInSeconds} секунд`)

    if (confirm("Завершить?")) {
        const data = {
            isBusy: false
        }
        await axios.put(`${WINDOWS_URL}/${window?.value?.id}`, data, config)
            .then(() => status.value = Status.Waiting)
        await axios.delete(`${WINDOWS_URL}/${window?.value?.id}/clients/${client.value?.id}`)
            .then(() => {
                client.value = null
                Update()
            })
            .catch(error => console.log(error))
    }
    else alert("Действие отменено")
}

// Расчет времени обслуживания клиента в секундах
onUpdated(() => {
    if (status.value === Status.Work)
        setInterval(() => {
            serviceTime.value += 1
            console.log('Расчет времени обслуживания клиента в секундах')
        }, 1000)
})


// Проверка на наличие новых клиентов через интервал времени
const isRefreshed = ref<boolean>(false)
const intervalTime = 5000

onMounted(() => {
    setInterval(() => {
        Update()
    }, intervalTime)
})


function Update() {
    isRefreshed.value = false

    if (!client.value) {
        getCurrentClientAtWindow()
        status.value = Status.HasClients
        isRefreshed.value = true
        console.log('Update')
    }
}

</script>

<template>
    <div class="employe__workspace">
        <header class="employe__header">
            <h1 class="title">{{ window?.name }}</h1>
            <div
                class="status"
                v-show="isRefreshed"
            >Обновлено
            </div>
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
                    @click.left="DenyClient"
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
                    @click.left="CompleteService"
                >
                    Завершить обслуживание
                </button>
                <button
                    class="btn-reset employe__btn employe__btn-skip"
                    @click.left="DenyClient"
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