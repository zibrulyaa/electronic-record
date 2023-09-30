<script setup lang='ts'>
import AsideMenu from './AsideMenu.vue';
</script>

<template>
    <div class="root">
        <AsideMenu />
        <main class="content">
            <div class="container">
                <slot></slot>
            </div>
        </main>
    </div>
</template>

<style lang='scss' scoped>
@import '@/assets/scss/vars';
@import '@/assets/scss/mixins';

.content {
    padding-top: 100px;
}
</style>