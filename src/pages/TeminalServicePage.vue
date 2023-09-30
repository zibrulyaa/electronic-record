<script setup lang='ts'>
import AppLayout from '@/components/AppLayout.vue';
import ServiceCard from '@/components/ServiceCard.vue';
import SkeletonCard from '@/components/skeletons/SkeletonCard.vue'

import axios from 'axios';
import { ref, computed } from 'vue'

import type { Category, Service } from '@/types/'
import { ALL_CATEGORIES_URL } from '@/constants'
import { useRoute, useRouter } from 'vue-router';


const route = useRoute()
const router = useRouter()
const categoryId = computed(() => route.fullPath.split('/').splice(2, 1));

const category = ref<Category | null>(null);
async function getCategory() {
    const data = await axios.get(`${ALL_CATEGORIES_URL}/${categoryId.value}`)
    category.value = data?.data
}

getCategory()
// Get all services
const services = ref<Service[] | null>();

async function getServices() {
    const data = await axios.get(`${ALL_CATEGORIES_URL}/${categoryId.value}/service`)
    services.value = data?.data
}
getServices()
// 

const selectedService = ref<Service | null>(null)

const chooseService = (choosenService: Service) => {
    selectedService.value = choosenService
}

function goBack() {
    router.go(-1)
}

</script>

<template>
    <AppLayout>
        <div class="wrapper">
            <div class="content" v-if="services?.length === 0">
                <header class="header">
                    <button class="btn-reset back-btn" @click="goBack">Вернуться назад</button>
                    <div class="title">Категория: "{{ category?.name }}"</div>
                </header>
                <div class="empty">Услуги не были найдены 🙁</div>
            </div>
            <div class="content" v-else-if="services">
                <header class="header">
                    <button class="btn-reset back-btn" @click="goBack">Вернуться назад</button>
                    <div class="title">Категория: "{{ category?.name }}"</div>
                </header>
                <ServiceCard :services="services" @choose-service="chooseService" />
                <button class="btn ticket-btn btn-reset" :disabled="!selectedService">Взять талон</button>
            </div>
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

.empty {
    text-align: center;
    font-size: 24px;
}
</style>