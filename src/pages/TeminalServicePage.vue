<script setup lang='ts'>
import AppLayout from '@/components/AppLayout.vue';
import ServiceCard from '@/components/ServiceCard.vue';
import SkeletonCard from '@/components/skeletons/SkeletonCard.vue'

import { ref, computed } from 'vue'

import type { Service } from '@/types/'

import { useRoute, useRouter } from 'vue-router';
import { useServices } from '@/utils/useServices';
import { useCategory } from '@/utils/useCategory';


const route = useRoute()
const router = useRouter()
const categoryId = computed(() => route.fullPath.split('/').splice(2, 1).toString());

const { category } = useCategory(categoryId.value)
const { services } = useServices(categoryId.value)

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
</style>