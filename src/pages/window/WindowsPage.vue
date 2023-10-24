<script setup lang='ts'>
import AppLayout from '@/components/AppLayout.vue'
import CurrentTime from '@/components/CurrentTime.vue'
import WindowsTable from '@/components/window/WindowsTable.vue'
</script>

<template>
    <AppLayout>
        <header class="windows__header">
            <h1 class="title">Окна очереди</h1>
            <CurrentTime />
        </header>
        <WindowsTable />
    </AppLayout>
</template>

<style lang='scss' scoped>
@import '@/assets/scss/vars';
@import '@/assets/scss/mixins';

.windows__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 64px;
}
</style>