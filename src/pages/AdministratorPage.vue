<script setup lang='ts'>
import AppLayout from '@/components/AppLayout.vue';
interface Props {
}
defineProps<Props>()
</script>

<template>
    <AppLayout>
        Administrator page
    </AppLayout>
</template>

<style lang='scss' scoped>
@import '@/assets/scss/vars';
@import '@/assets/scss/mixins';
</style>