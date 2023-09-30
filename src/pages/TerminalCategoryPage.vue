<script setup lang='ts'>
import AppLayout from '@/components/AppLayout.vue';
import CategoryCard from '@/components/CategoryCard.vue';
import SkeletonCard from '@/components/skeletons/SkeletonCard.vue'

import axios from 'axios';
import { ref, computed } from 'vue'

import type { Category } from '@/types/'
import { ALL_CATEGORIES_URL } from '@/constants'
import { useRouter } from 'vue-router';



// Get all categories
const categories = ref<Category[]>();

async function getCategories() {
    const data = await axios.get(`${ALL_CATEGORIES_URL}`)
    categories.value = data?.data
}

getCategories()

const selectedCateroty = ref<Category | null>(null)

const chooseCategory = (choosenCategory: Category) => {
    selectedCateroty.value = choosenCategory
}
const router = useRouter()
function goBack() {
    router.go(-1)
}

</script>

<template>
    <AppLayout>
        <div class="wrapper">
            <div class="content" v-if="categories">
                <header class="header">
                    <button class="btn-reset back-btn" @click="goBack">Вернуться назад</button>
                    <div class="title">Выберите категорию</div>
                </header>
                <CategoryCard :categories="categories" @choose-category="chooseCategory" />
            </div>
            <SkeletonCard v-else />
        </div>
    </AppLayout>
</template>

<style lang='scss' scoped>
@import '@/assets/scss/vars';
@import '@/assets/scss/mixins';

.wrapper {
    height: 800px;
    display: flex;
    flex-direction: column;
}

.service__inner {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    margin-bottom: 100px;
}

.ticket-btn {
    display: block;
    width: 580px;
    text-align: center;
    margin-top: auto;
    margin-left: auto;
    margin-right: auto;
}
</style>