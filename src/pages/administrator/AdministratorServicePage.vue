<script setup lang='ts'>
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';

import { CATEGORIES_URL } from '@/constants';
import type { Service, Window } from '@/types';

import AppLayout from '@/components/AppLayout.vue';
import ServiceForm from '@/components/administrator/services/ServiceForm.vue'

const route = useRoute()
const router = useRouter()

// Какая то чепуха, переделать мб
const serviceId = computed((): string => route.params.serviceId.toString())
const categoryId = computed((): string => route.params.categoryId.toString())

const service = ref<Service>()

async function getService() {
    const responce = await axios.get(`${CATEGORIES_URL}/${categoryId.value}/service/${serviceId.value}`)
    service.value = responce?.data
}

getService()

const config = {
    headers: { 'content-type': 'application/json' },
}

async function updateService(name: string, description: string, windows: Window[], serviceTime: string) {

    const data: Service = {
        id: serviceId.value,
        categoryId: categoryId.value,
        name,
        windows: [],
        description,
        serviceTime
    }

    for (const window of windows) {
        data.windows.push(window)
    }

    await axios.put(`${CATEGORIES_URL}/${categoryId.value}/service/${serviceId.value}`, data, config)
        .then(() => closeServiceForm())
        .catch(error => console.log(error))
}

async function deleteService() {
    await axios.delete(`${CATEGORIES_URL}/${categoryId.value}/service/${serviceId.value}`)
    closeServiceForm()
}


function closeServiceForm() {
    router.go(-1)
}
</script>

<template>
    <AppLayout>
        <div class="wrapper">
            <div class="content"
                 v-if="service">
                <ServiceForm title="Редактирование"
                             :current-name="service.name"
                             :current-description="service.description"
                             :current-service-time="service.serviceTime"
                             :current-selected-windows="service.windows"
                             :update-service="updateService"
                             :delete-service="deleteService"
                             :discard-changes="closeServiceForm" />
            </div>
            <div class="content"
                 v-else>Загрузка...</div>
        </div>
    </AppLayout>
</template>
