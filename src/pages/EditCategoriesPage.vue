<script setup lang='ts'>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

import { CATEGORIES_URL } from '@/constants';
import { useCategories } from '@/composables/useCategories'

import CategoryCard from '@/components/administrator/categories/CategoryCard.vue';
import CategoryForm from '@/components/administrator/categories/CategoryForm.vue';
import AppLayout from '@/components/AppLayout.vue';

const router = useRouter()

function goBack() {
    router.go(-1)
}

const { categories, getCategories } = useCategories()

const isFormShown = ref<boolean>(false)

function openForm() {
    isFormShown.value = true
}

function closeForm() {
    getCategories()
    isFormShown.value = false
}

const config = {
    headers: { 'content-type': 'application/json' },
}

async function addCatagory(name: string, description: string) {
    const formData = new FormData()
    formData.append('name', name)
    formData.append('description', description)
    await axios.post(CATEGORIES_URL, formData, config)
    closeForm()
}

</script>

<template>
    <AppLayout>
        <div class="wrapper">
            <CategoryForm v-show="isFormShown"
                          @close-form="closeForm"
                          title="Добавление новой категории"
                          :submit-callback="addCatagory" />
            <div class="content"
                 v-show="!isFormShown">
                <header class="header">
                    <button class="btn-reset back-btn"
                            @click="goBack">Вернуться назад</button>
                    <div class="title">Настройки "Услуги"</div>
                </header>
                <div class="categories"
                     v-if="categories">
                    <button class="btn-reset categories-btn"
                            @click="openForm">Добавить категорию</button>
                    <CategoryCard :categories="categories" />
                </div>
                <div class="content"
                     v-else>Загрузка</div>
            </div>
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