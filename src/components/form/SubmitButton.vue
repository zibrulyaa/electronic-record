<script setup lang='ts'>
import SaveIcon from '@/components/icons/SaveIcon.vue'

defineProps<{
    isValid: boolean
}>()

</script>

<template>
    <button
        class="btn-reset form-btn"
        :class="{ disabled: isValid }"
        type="submit"
    >
        <SaveIcon />
        Добавить
    </button>
</template>
