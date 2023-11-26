<script setup lang='ts'>
import AppLayout from '@/components/AppLayout.vue';
import CategoryCard from '@/components/terminal/CategoryCard.vue';
import SkeletonCard from '@/components/skeletons/SkeletonCard.vue'
import BackButton from '@/components/BackButton.vue';

import { ref } from 'vue'

import type { Category } from '@/types/'
import { useCategories } from '@/composables/useCategories'

const { categories, errorObj } = useCategories()

const selectedCaterory = ref<Category>()

const chooseCategory = (choosenCategory: Category) => {
    selectedCaterory.value = choosenCategory
}
</script>

<template>
    <AppLayout>
        <div class="wrapper">
            <!-- Не найдены категории -->
            <div
                class="content"
                v-if="categories?.length === 0 || errorObj?.response?.status === 404"
            >
                <header class="header">
                    <BackButton />
                    <div class="title">Все категории</div>
                </header>
                <div class="empty">Категории не были найдены 🙁</div>
            </div>
            <!-- Найдены категории -->
            <div
                class="content"
                v-else-if="categories"
            >
                <header class="header">
                    <BackButton />
                    <div class="title">Выберите категорию</div>
                </header>
                <CategoryCard
                    :categories="categories"
                    @choose-category="chooseCategory"
                />
            </div>
            <!-- Скелетоны -->
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