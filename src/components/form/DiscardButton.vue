<script setup lang='ts'>
import DiscardIcon from '../icons/DiscardIcon.vue';

interface Props {
    text: string
}
defineProps<Props>()
</script>

<template>
    <button class="form-btn form-btn-discard btn-reset">
        <DiscardIcon />
        {{ text }}
    </button>
</template>

<style lang='scss' scoped>
@import '@/assets/scss/vars';
@import '@/assets/scss/mixins';
</style>