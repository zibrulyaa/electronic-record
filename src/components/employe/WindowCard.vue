<script setup lang='ts'>
import type { Window } from '@/types';
defineProps<{
    window: Window
}>()
</script>

<template>
    <div
        class="window__card"
        :class="{ active: !window.isBusy }"
    >
        {{ window.name }}
    </div>
</template>

<style lang='scss' scoped>
@import '@/assets/scss/vars';
@import '@/assets/scss/mixins';


.window__card {
    background-color: $disabled;
    color: $white;
    text-align: center;
    font-size: 32px;
    border-radius: 10px;
    padding: 32px 16px;
    max-width: 380px;
    cursor: not-allowed;

    &.active {
        cursor: pointer;
        background-color: $accent;
    }
}
</style>