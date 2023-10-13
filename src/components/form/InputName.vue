<script setup lang='ts'>
import { computed } from 'vue';

const props = defineProps<{
    modelValue: string
}>()

const emit = defineEmits(['update:modelValue'])

const name = computed({
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
        <span class="label-title">Название: </span>
        <input class="input-reset input"
               type="text"
               name="name"
               placeholder="Введите название"
               v-model="name" />
    </label>
</template>
