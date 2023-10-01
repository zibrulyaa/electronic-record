<script setup lang='ts'>
import { ref } from 'vue';

interface Props {
    type: string,
    name: string,
    placeholder: string,
    label: string
}
defineProps<Props>()

const value = ref<string | "">()

</script>

<template>
    <label class="label">
        <span class="label-title"> {{ label }}</span>
        <input class="input-reset input" :type="type" :name="name" v-model="value" :placeholder="placeholder" />
    </label>
</template>

<style lang='scss' scoped>
@import '@/assets/scss/vars';
@import '@/assets/scss/mixins';

.input {
    background-color: $bg;
    padding: 12px 19px;
    max-width: 680px;
    border-radius: 4px; 
    width: 100%;
    outline: none;

    &::placeholder {
        color: $disabled;
    }

    &:focus {
        padding: 11px 18px;
        border: 1px solid $accent;
    }
}

.label {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;

    &-title {
        display: inline-block;
    }
}
</style>