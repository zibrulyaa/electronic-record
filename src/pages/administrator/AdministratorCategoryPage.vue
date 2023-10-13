<script setup lang='ts'>
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';

import { CATEGORIES_URL } from '@/constants';
import type { Service, Window } from '@/types'
import { useCategory } from '@/composables/useCategory'
import { useServices } from '@/composables/useServices'

import AppLayout from '@/components/AppLayout.vue'
import CategoryForm from '@/components/administrator/categories/CategoryForm.vue'
import ServiceCards from '@/components/administrator/services/ServiceCards.vue'
import ServiceForm from '@/components/administrator/services/ServiceForm.vue'

const route = useRoute()
const router = useRouter()

const categoryId = computed((): string => route.params.categoryId.toString())

const { category } = useCategory(categoryId.value)
const { services, getServices } = useServices(categoryId.value)


//#region FormActions
const config = {
    headers: { 'content-type': 'application/json' },
}

async function updateCategory(name: string, description: string) {
    const data = {
        name,
        description
    }
    await axios.put(`${CATEGORIES_URL}/${categoryId.value}`, data, config)
        .then(() => closeForm())
        .catch(error => console.log(error))
}

async function deleteCategory() {
    await axios.delete(`${CATEGORIES_URL}/${categoryId.value}`)
        .then(() => closeForm())
        .catch(error => console.log(error))
}

function closeForm() {
    router.go(-1)
}


//#endregion

async function addService(name: string, description: string, windows: Window[], serviceTime: string) {

    const data: Service = {
        categoryId: categoryId.value,
        name,
        description,
        windows: [],
        serviceTime
    }

    for (const window of windows) {
        data.windows.push(window)
    }

    console.log(data)

    await axios.post(`${CATEGORIES_URL}/${categoryId.value}/service`, data, config)
        .then(() => closeServiceForm())
        .catch(error => console.log(error))
}

const isCategoryFormShown = ref<boolean>(true)
const isServiceFormShown = ref<boolean>(false)

function openServiceForm() {
    isCategoryFormShown.value = false
    isServiceFormShown.value = true
}
function closeServiceForm() {
    getServices()
    isCategoryFormShown.value = true
    isServiceFormShown.value = false
}
</script>

<template>
    <AppLayout>
        <div class="wrapper">
            <div class="content"
                 v-if="category">
                <CategoryForm title="Редактирование"
                              v-show="isCategoryFormShown"
                              :update-category="updateCategory"
                              :delete-category="deleteCategory"
                              :current-name="category.name"
                              :current-description="category.description"
                              :discard-changes="closeForm" />
                <ServiceForm title="Новая услуга"
                             v-show="isServiceFormShown"
                             :add-service="addService"
                             :discard-changes="closeServiceForm" />

                <ServiceCards v-if="services"
                              v-show="isCategoryFormShown"
                              :services="services"
                              :categoryId="categoryId"
                              @open-service-form="openServiceForm" />
            </div>
            <div class="content"
                 v-else>Загрузка...</div>
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