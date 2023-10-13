<script setup lang='ts'>
import { computed } from 'vue';

const props = defineProps<{
    modelValue: string
}>()

const emit = defineEmits(['update:modelValue'])

const description = computed({
    get() {
        return props.modelValue
    },
    set(value) {
        emit('update:modelValue', value)
    }
})

</script>

<template>
    <label class="label">
        <span class="label-title">Описание</span>
        <input class="input-reset input"
               type="text"
               name="description"
               placeholder="Введите описание"
               v-model="description" />
    </label>
</template>

<style lang='scss' scoped>
@import '@/assets/scss/vars';
@import '@/assets/scss/mixins';
</style>