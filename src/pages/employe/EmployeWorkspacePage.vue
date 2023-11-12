<script setup lang='ts'>
import AppLayout from '@/components/AppLayout.vue'
import EmployeWorkspace from '@/components/employe/EmployeWorkspace.vue';
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()

const windowId = computed(() => route.params.windowId.toString())

</script>

<template>
    <AppLayout>
        <EmployeWorkspace :window-id="windowId"/>
    </AppLayout>
</template>

<style lang='scss' scoped>
@import '@/assets/scss/vars';
@import '@/assets/scss/mixins';
</style>