<script setup lang='ts'>
import AppLayout from '@/components/AppLayout.vue'
import SettingsMenu from '@/components/administrator/SettingsMenu.vue'
import StatisticsSection from '@/components/administrator/statistics/StatisticsSection.vue';

</script>

<template>
    <AppLayout>
        <div class="wrapper">
            <SettingsMenu />
            <StatisticsSection />
        </div>
    </AppLayout>
</template>

<style lang='scss' scoped>
@import '@/assets/scss/vars';
@import '@/assets/scss/mixins';


</style>