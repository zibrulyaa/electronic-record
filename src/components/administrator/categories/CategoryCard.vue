<script setup lang='ts'>
import type { Category } from '@/types';
import ArrowRightIcon from '@/components/icons/ArrowRightIcon.vue';
interface Props {
    categories: Category[]
}
defineProps<Props>()

</script>

<template>
    <ul class="category__list list-reset">
        <li class="category__card" v-for="category in categories" :key="category.id">
            <RouterLink :to="`/administrator/editCategory/${category.id}`">
                <header class="category__card-header">
                    <h3 class="category__card-title">{{ category.name }}</h3>
                    <ArrowRightIcon />
                </header>
                <p class="category__card-description">{{ category.description }}</p>
            </RouterLink>
        </li>
    </ul>
</template>

<style lang='scss' scoped>
@import '@/assets/scss/vars';
@import '@/assets/scss/mixins';


.category {
    // .category__list

    &__list {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: repeat(3, 1fr);
        gap: 20px;
    }

    // .category__card

    &__card {
        padding: 32px;
        border-radius: 10px;
        background-color: $white;
        box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.05);
        max-width: 380px;
        cursor: pointer;

        &:hover {
            padding: 31px;
            border: 1px solid $disabled;
        }
    }

    // .category__card-header

    &__card-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 24px;
    }

    // .category__card-title

    &__card-title {
        color: $accent;
        font-size: 24px;
        font-style: normal;
        font-weight: 400;
        line-height: 140%;
    }

    // .category__card-description

    &__card-description {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 18px;
        font-style: normal;
        font-weight: 400;
        line-height: 140%;
    }
}
</style>