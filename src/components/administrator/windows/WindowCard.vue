<script setup lang='ts'>
import type { Window } from '@/types'
import { ROUTER_PATHS } from '@/constants'

import ArrowRightIcon from '@/components/icons/ArrowRightIcon.vue';

defineProps<{
    windows: Window[]
}>()
</script>

<template>
    <ul class="windows__list list-reset">
        <li
            v-for="window in windows"
            :key="window.id"
        >
            <RouterLink
                class="window__card"
                :to="{ name: ROUTER_PATHS.ADMINISTRATOR_WINDOW_EDIT, params: { windowId: window.id } }"
            >
                <header class="window__card-header">
                    <h3 class="window__card-title">{{ window.name }}</h3>
                    <ArrowRightIcon />
                </header>
            </RouterLink>
        </li>
    </ul>
</template>

<style lang='scss' scoped>
@import '@/assets/scss/vars';
@import '@/assets/scss/mixins';

.windows__list {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
}

.window {
    // .category__list

    &__list {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: repeat(3, 1fr);
        gap: 20px;
    }

    // .category__card

    &__card {
        display: block;
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
    }

    // .category__card-title

    &__card-title {
        color: $accent;
        font-size: 24px;
        font-style: normal;
        font-weight: 400;
        line-height: 140%;
    }

}

</style>