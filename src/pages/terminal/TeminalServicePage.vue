<script setup lang='ts'>
//#region Импорты
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router';
import axios from 'axios';

import type { Client, Service } from '@/types'
import { WINDOWS_URL } from '@/constants';

import { useServices } from '@/composables/useServices';
import { useCategory } from '@/composables/useCategory';

import AppLayout from '@/components/AppLayout.vue';
import ServiceCard from '@/components/terminal/ServiceCard.vue';
import SkeletonCard from '@/components/skeletons/SkeletonCard.vue'
import BackButton from '@/components/BackButton.vue';

//#endregion

const route = useRoute()
const categoryId = computed((): string => route.params.categoryId.toString());

const { category } = useCategory(categoryId.value)
const { services } = useServices(categoryId.value)

const selectedService = ref<Service>()

const chooseService = (choosenService: Service) => {
    selectedService.value = choosenService
}
const config = {
    headers: { 'content-type': 'application/json' },
}

async function createNewClient() {
    if (!selectedService.value) {
        alert("Не выбрана услуга!")
        return
    }
    else {
        const windowId = getRandomWindow()
        const today = new Date()
        const unixtime = Math.floor(today.getTime() / 1000)
        const queueNumber = getQueueNumber()

        const data: Client =
        {
            serviceId: selectedService.value?.id as string,
            date: unixtime,
            windowId,
            queueNumber
        }

        try {

            await axios.post(`${WINDOWS_URL}/${windowId}/clients`, data, config)
        }
        catch (error) {
            console.log(error)
        }
    }
}

// Заглушка clients
let clients: Client[] = [
    {
        "id": "1",
        "serviceId": "1",
        "windowId": "1",
        "queueNumber": 1,
        "date": 1700565634
    },
    {
        "id": "2",
        "serviceId": "2",
        "windowId": "1",
        "queueNumber": 2,
        "date": 1700565235
    },
    {
        "id": "3",
        "serviceId": "3",
        "windowId": "1",
        "queueNumber": 3,
        "date": 1700564342
    },
    {
        "id": "4",
        "serviceId": "4",
        "windowId": "2",
        "queueNumber": 4,
        "date": 1700565534
    }
]

// 
function getRandomWindow() {
    const availableWindowsToService: number[] = selectedService.value?.windows

    if (availableWindowsToService?.length) {
        var rand = Math.floor(Math.random() * availableWindowsToService?.length);
        return availableWindowsToService[rand].toString()
    }

}

function getQueueNumber() {
    return clients.length + 1
}
// Конец заглушки

</script>

<template>
    <AppLayout>
        <div class="wrapper">
            <!-- Не найдены услуги -->
            <div
                class="content"
                v-if="services?.length === 0"
            >
                <header class="header">
                    <BackButton />
                    <div class="title">Категория: "{{ category?.name }}"</div>
                </header>
                <div class="empty">Услуги не были найдены 🙁</div>
            </div>
            <!-- Найдены услуги -->
            <div
                class="content"
                v-else-if="services"
            >
                <header class="header">
                    <BackButton />
                    <div class="title">Категория: "{{ category?.name }}"</div>
                </header>
                <ServiceCard
                    :services="services"
                    @choose-service="chooseService"
                />
                <button
                    class="btn ticket-btn btn-reset"
                    :disabled="!selectedService"
                    @click.left="createNewClient"
                >Взять талон</button>
            </div>
            <!-- Скелетоны -->
            <SkeletonCard v-else />
        </div>
    </AppLayout>
</template>

<style lang='scss' scoped>
@import '@/assets/scss/vars';
@import '@/assets/scss/mixins';


.ticket-btn {
    display: block;
    width: 580px;
    text-align: center;
    margin-top: auto;
    margin-left: auto;
    margin-right: auto;
}
</style>