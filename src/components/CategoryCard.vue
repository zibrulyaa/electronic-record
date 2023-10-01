<script setup lang='ts'>
import type { Category } from '@/types/'
import { ROUTER_PATHS } from '@/constants';
interface Props {
    categories: Category[] | null,
}
defineProps<Props>()

</script>

<template>
    <ul class="cards__inner list-reset">
        <li v-for="caterory in categories" :key="caterory.id">
            <RouterLink class="card" :to="`${ROUTER_PATHS.CATEGORIES}/${caterory.id}/services`">
                <h3 class="card__title">{{ caterory.name }}</h3>
                <p class="card__description">{{ caterory.description }}</p>
            </RouterLink>
        </li>
    </ul>

</template>

<style lang='scss' scoped>
@import '@/assets/scss/vars';
@import '@/assets/scss/mixins';
</style>