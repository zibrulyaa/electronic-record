<script setup lang='ts'>
import { computed } from 'vue';

const props = defineProps<{
    modelValue: string,
    error?: string,
    isError?: boolean
}>()
const emit = defineEmits(['update:modelValue'])


const serviceTime = computed({
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
        <span class="label-title">Время обслуживания</span>
        <div class="input__wrapper">
            <input
                class="input-reset input"
                :class="{ input__error: isError }"
                type="text"
                name="serviceTime"
                placeholder="Введите время обслуживания"
                v-model="serviceTime"
            />
            <div
                class="error__label"
                v-if="error"
            >
                {{ error }}
            </div>
        </div>
    </label>
</template>

<style lang='scss' scoped>
@import '@/assets/scss/vars';
@import '@/assets/scss/mixins';
</style>