<script setup lang='ts'>
import AppLayout from '@/components/AppLayout.vue';
import SettingsHeader from '@/components/administrator/SettingsHeader.vue'

import { useCategories } from '@/utils/useCategories'

const { categories } = useCategories()

</script>

<template>
    <AppLayout>
        <div class="wrapper">
            <SettingsHeader :categories="categories ? categories : '[]'" />
        </div>
    </AppLayout>
</template>

<style lang='scss' scoped>
@import '@/assets/scss/vars';
@import '@/assets/scss/mixins';
</style>