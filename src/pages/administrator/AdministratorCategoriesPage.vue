<script setup lang='ts'>
import { ref } from 'vue'
import axios from 'axios'

import type { Category } from '@/types';
import { CATEGORIES_URL } from '@/constants';

import { useCategories } from '@/composables/useCategories'

import AppLayout from '@/components/AppLayout.vue'
import CategoryCard from '@/components/administrator/categories/CategoryCard.vue'
import CategoryForm from '@/components/administrator/categories/CategoryForm.vue'
import BackButton from '@/components/BackButton.vue'


const { categories, getCategories } = useCategories()


//#region FormActions
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
    const data: Category = {
        name,
        description
    }
    await axios.post(CATEGORIES_URL, data, config)
        .then(() => closeForm())
        .catch(error => console.log(error))
}

//#endregion
</script>

<template>
    <AppLayout>
        <div class="wrapper">
            <CategoryForm
                title="Добавление новой категории"
                v-show="isFormShown"
                :add-category="addCatagory"
                :discard-changes="closeForm"
            />
            <div
                class="content"
                v-if="categories"
                v-show="!isFormShown"
            >
                <header class="header">
                    <BackButton />
                    <div class="title">Настройки "Услуги"</div>
                </header>
                <div class="categories">
                    <button
                        class="btn-reset categories__add-btn"
                        @click="openForm"
                    >
                        Добавить категорию
                    </button>
                    <CategoryCard :categories="categories" />
                </div>
            </div>
            <div
                class="content"
                v-else
            >Загрузка...
            </div>
        </div>
    </AppLayout>
</template>

<style lang='scss' scoped>
@import '@/assets/scss/vars';
@import '@/assets/scss/mixins';


.categories__add-btn {
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