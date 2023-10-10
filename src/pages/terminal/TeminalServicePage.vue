<script setup lang='ts'>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router';

import type { Service } from '@/types/'

import { useServices } from '@/composables/useServices';
import { useCategory } from '@/composables/useCategory';

import AppLayout from '@/components/AppLayout.vue';
import ServiceCard from '@/components/terminal/ServiceCard.vue';
import SkeletonCard from '@/components/skeletons/SkeletonCard.vue'

const route = useRoute()
const router = useRouter()
const categoryId = computed((): number => Number(route.params.categoryId));

const { category } = useCategory(categoryId.value)
const { services } = useServices(categoryId.value)

const selectedService = ref<Service>()

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
            <div
                class="content"
                v-if="services?.length === 0"
            >
                <header class="header">
                    <button
                        class="btn-reset back-btn"
                        @click.left="goBack"
                    >Вернуться назад</button>
                    <div class="title">Категория: "{{ category?.name }}"</div>
                </header>
                <div class="empty">Услуги не были найдены 🙁</div>
            </div>
            <div
                class="content"
                v-else-if="services"
            >
                <header class="header">
                    <button
                        class="btn-reset back-btn"
                        @click.left="goBack"
                    >Вернуться назад</button>
                    <div class="title">Категория: "{{ category?.name }}"</div>
                </header>
                <ServiceCard
                    :services="services"
                    @choose-service="chooseService"
                />
                <button
                    class="btn ticket-btn btn-reset"
                    :disabled="!selectedService"
                >Взять талон</button>
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
}</style>