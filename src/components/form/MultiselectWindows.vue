<script setup lang='ts'>
import { computed } from 'vue'

import type { Window } from '@/types'

import VueMultiselect from 'vue-multiselect'


// Времянка 
const windows = [
    {
        "id": "1",
        "name": "1 окно",
        "status": "opened"
    },
    {
        "id": "2",
        "name": "2 окно",
        "status": "closed"
    },
    {
        "id": "3",
        "name": "3 окно",
        "status": "closed"
    },
    {
        "id": "4",
        "name": "4 окно",
        "status": "closed"
    },
    {
        "id": "5",
        "name": "5 окно",
        "status": "closed"
    },
    {
        "id": "6",
        "name": "6 окно",
        "status": "closed"
    },
    {
        "id": "7",
        "name": "7 окно",
        "status": "closed"
    }
    ,
    {
        "id": "8",
        "name": "8 окно",
        "status": "closed"
    }
    ,
    {
        "id": "9",
        "name": "9 окно",
        "status": "closed"
    }
]

const props = defineProps<{
    modelValue: Window[],
    error?: string,
    isError?: boolean
}>()

const emit = defineEmits(['update:modelValue'])

const selectedWindows = computed({
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
        <span class="label-title">Окна</span>
        <div class="input__wrapper">
            <VueMultiselect
                v-model="selectedWindows"
                :options="windows"
                :multiple="true"
                :close-on-select="true"
                :preserve-search="true"
                label="name"
                track-by="name"
                placeholder="Выберите окна"
                deselect-label="Нажмите enter чтобы убрать"
                selected-label="Выбрано"
                select-label="Нажмите enter чтобы выбрать"
            >
            </VueMultiselect>
            <div
                class="error__label"
                v-if="error"
            >
                {{ error }}
            </div>
        </div>
    </label>
</template>

<style src="@/../node_modules/vue-multiselect/dist/vue-multiselect.css"></style>

<style lang='scss' >
@import '@/assets/scss/vars';
@import '@/assets/scss/mixins';


.multiselect {
    max-width: 680px;
}

.multiselect__tags {
    border: none;
    background-color: $bg;
    padding: 12px 19px;
}

.multiselect__tag {
    background-color: $accent ;
}

.multiselect__placeholder {
    margin-bottom: 0;
    color: $disabled;
}

.multiselect__option {
    &--highlight {
        background-color: $accent;
    }

    &--highlight &--selected {
        background-color: $red;
    }
}

.multiselect__option--highlight::after {
    background-color: $accent;
}

.multiselect__option--selected.multiselect__option--highlight {
    background-color: $red;
}

.multiselect__tag-icon::after {
    content: "×";
    color: $white;
    font-size: 14px;
}

.multiselect__input {
    background-color: $bg;
    font-size: 14px;
}
</style>