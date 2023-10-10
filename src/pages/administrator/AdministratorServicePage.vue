<script setup lang='ts'>
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import AppLayout from '@/components/AppLayout.vue';
import ServiceForm from '@/components/administrator/services/ServiceForm.vue'
import axios from 'axios';
import { CATEGORIES_URL } from '@/constants';
import type { Service, Window } from '@/types';

const route = useRoute()
const router = useRouter()

// Какая то чепуха, переделать мб
const serviceId = computed((): string => route.params.serviceId.toString())
const categoryId = computed((): string => route.params.categoryId.toString())

console.log(typeof (serviceId.value))

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
            <div
                class="content"
                v-if="service"
            >
                <ServiceForm
                    title="Редактирование"
                    @close-service-form="closeServiceForm"
                    :add="false"
                    :submit-callback="updateService"
                    :additional-callback="deleteService"
                    :current-name="service.name"
                    :current-description="service.description"
                    :current-service-time="service.serviceTime"
                    :current-selected-windows="service.windows"
                />
            </div>
            <div
                class="content"
                v-else
            >Загрузка...</div>
        </div>
    </AppLayout>
</template>

<style lang='scss' scoped>
@import '@/assets/scss/vars';
@import '@/assets/scss/mixins';


.categories-btn {
    width: 100%;
    border-radius: 10px;
    border: 3px dashed $disabled;
    font-size: 24px;
    font-weight: 400;
    line-height: 140%;
    padding: 32px;
    color: $accent;
    margin-bottom: 64px;
    transition: all .3s ease;

    &:hover {
        border: 3px solid $accent;
        background-color: $accent;
        color: $white;
    }
}
</style>