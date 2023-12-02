<script setup lang='ts'>
import AppLayout from '@/components/AppLayout.vue';
import { ROUTER_PATHS } from '@/constants';
</script>

<template>
    <AppLayout>
        <div class="wrapper">
            <RouterLink
                class="btn terminal-btn"
                :to="ROUTER_PATHS.CATEGORIES"
            >Подойти к терминалу</RouterLink>
        </div>
    </AppLayout>
</template>

<style lang='scss' scoped>
@import '@/assets/scss/vars';
@import '@/assets/scss/mixins';

.wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 800px;
}
</style>