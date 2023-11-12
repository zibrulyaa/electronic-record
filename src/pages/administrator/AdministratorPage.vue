<script setup lang='ts'>
import AppLayout from '@/components/AppLayout.vue';
import SettingsHeader from '@/components/administrator/SettingsHeader.vue'



</script>

<template>
    <AppLayout>
        <div class="wrapper">
            <SettingsHeader />
            <h3 class="subtitle">Статистика</h3>
        </div>
    </AppLayout>
</template>

<style lang='scss' scoped>
@import '@/assets/scss/vars';
@import '@/assets/scss/mixins';
</style>