<script setup lang='ts'>
import DeleteIcon from '@/components/icons/DeleteIcon.vue';
</script>

<template>
    <button class="form-btn  form-btn-delete btn-reset"
            type="submit">
        <DeleteIcon />
        Удалить
    </button>
</template>

<style lang='scss' scoped>
@import '@/assets/scss/vars';
@import '@/assets/scss/mixins';
</style>