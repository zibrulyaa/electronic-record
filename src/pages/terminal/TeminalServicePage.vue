<script setup lang='ts'>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router';

import type { Service } from '@/types/'

import { useServices } from '@/composables/useServices';
import { useCategory } from '@/composables/useCategory';

import AppLayout from '@/components/AppLayout.vue';
import ServiceCard from '@/components/terminal/ServiceCard.vue';
import SkeletonCard from '@/components/skeletons/SkeletonCard.vue'
import BackButton from '@/components/BackButton.vue';

const route = useRoute()
const categoryId = computed((): string => route.params.categoryId.toString());

const { category } = useCategory(categoryId.value)
const { services } = useServices(categoryId.value)

const selectedService = ref<Service>()

const chooseService = (choosenService: Service) => {
    selectedService.value = choosenService
}
</script>

<template>
    <AppLayout>
        <div class="wrapper">
            <!-- Не найдены услуги -->
            <div class="content"
                 v-if="services?.length === 0">
                <header class="header">
                    <BackButton />
                    <div class="title">Категория: "{{ category?.name }}"</div>
                </header>
                <div class="empty">Услуги не были найдены 🙁</div>
            </div>
            <!-- Найдены услуги -->
            <div class="content"
                 v-else-if="services">
                <header class="header">
                    <BackButton />
                    <div class="title">Категория: "{{ category?.name }}"</div>
                </header>
                <ServiceCard :services="services"
                             @choose-service="chooseService" />
                <button class="btn ticket-btn btn-reset"
                        :disabled="!selectedService">Взять талон</button>
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