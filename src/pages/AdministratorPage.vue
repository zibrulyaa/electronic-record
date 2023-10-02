<script setup lang='ts'>
import AppLayout from '@/components/AppLayout.vue';
import SettingsHeader from '@/components/administrator/SettingsHeader.vue'

import { useCategories } from '@/composables/useCategories'

const { categoriesCount } = useCategories()

</script>

<template>
    <AppLayout>
        <div class="wrapper" v-if="categoriesCount">
            <SettingsHeader :categoriesCount="categoriesCount" />
        </div>
    </AppLayout>
</template>

<style lang='scss' scoped>
@import '@/assets/scss/vars';
@import '@/assets/scss/mixins';
</style>