<script setup lang='ts'>
import { ref } from 'vue';
import VueMultiselect from 'vue-multiselect'

import type { Window } from '@/types';

import SubmitButton from '@/components/form/SubmitButton.vue';
import DeleteButton from '@/components/form/DeleteButton.vue';
import DiscardButton from '@/components/form/DiscardButton.vue'
import UpdateButton from '@/components/form/UpdateButton.vue';


const props = withDefaults(defineProps<{
    title: string,
    submitCallback: Function,
    add: boolean,
    additionalCallback?: Function,
    currentName?: string,
    currentDescription?: string,
    currentSelectedWindows?: Window[],
    currentServiceTime?: string
}>(), {
    currentName: "",
    currentDescription: "",
    currentServiceTime: "",
    currentSelectedWindows: () => [],
    additionalCallback: () => { }
})



const name = ref<string>(props.currentName)
const description = ref<string>(props.currentDescription)
const selectedWindows = ref<Window[]>(props.currentSelectedWindows)
const serviceTime = ref<string>(props.currentServiceTime)

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

defineEmits(['closeServiceForm'])

</script>

<template>
    <div class="form__inner">
        <h3 class="subtitle">{{ title }}</h3>
        <div class="form">
            <label class="label">
                <span class="label-title">Название</span>
                <input
                    class="input-reset input"
                    type="text"
                    name="name"
                    placeholder="Введите название"
                    v-model="name"
                />
            </label>
            <label class="label">
                <span class="label-title">Описание</span>
                <input
                    class="input-reset input"
                    type="text"
                    name="description"
                    placeholder="Введите Описание"
                    v-model="description"
                />
            </label>
            <label class="label">
                <span class="label-title">Окна</span>
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
            </label>
            <label class="label">
                <span class="label-title">Время обслуживания</span>
                <input
                    class="input-reset input"
                    type="text"
                    name="serviceTime"
                    placeholder="Введите время обслуживания"
                    v-model="serviceTime"
                />
            </label>
            <div class="form__btns">
                <SubmitButton
                    v-if="add"
                    @click.left="submitCallback(name, description, selectedWindows, serviceTime)"
                />
                <UpdateButton
                    v-if="!add"
                    @click.left="submitCallback(name, description, selectedWindows, serviceTime)"
                />
                <DeleteButton
                    v-if="!add"
                    @click.left="additionalCallback()"
                />
                <DiscardButton @click.left="$emit('closeServiceForm')" />
            </div>

        </div>
    </div>
</template>


<style src="@/../node_modules/vue-multiselect/dist/vue-multiselect.css"></style>


<style lang='scss'>
@import '@/assets/scss/vars';
@import '@/assets/scss/mixins';

.form {
    background-color: $white;
    padding: 32px;
    border-radius: 10px;
    box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.05);

    &__title {
        margin-bottom: 24px;
    }

    &__btns {
        display: flex;
        gap: 20px;
    }
}

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

