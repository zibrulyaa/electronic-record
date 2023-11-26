<script setup lang='ts'>
import { ref, computed } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, minLength, maxLength, helpers, } from '@vuelidate/validators'

import SubmitButton from '@/components/form/SubmitButton.vue'
import DeleteButton from '@/components/form/DeleteButton.vue'
import DiscardButton from '@/components/form/DiscardButton.vue'
import UpdateButton from '@/components/form/UpdateButton.vue'

import InputName from '@/components/form/InputName.vue'
import { useValidationErrors } from '@/composables/useValidationErrors'


const props = withDefaults(defineProps<{
    title: string,
    currentName?: string,
    addWindow?: Function | null,
    updateWindow?: Function | null,
    deleteWindow?: Function | null,
    discardChanges: Function
}>(), {
    currentName: "",
    addWindow: null,
    updateWindow: null,
    deleteWindow: null,
})

// Валидация

interface IWindowForm {
    name: string,
}

const form = ref<IWindowForm>({
    name: props.currentName
})

const MIN_NAME_LENGTH = 3
const MAX_NAME_LENGTH = 12

const rules = {
    name: {
        required: helpers.withMessage("Поле является обязательным", required),
        minLength: helpers.withMessage(`Минимум ${MIN_NAME_LENGTH} символа`, minLength(MIN_NAME_LENGTH)),
        maxLength: helpers.withMessage(`Максимум ${MAX_NAME_LENGTH} символов`, maxLength(MAX_NAME_LENGTH))
    }
}

const v$ = useVuelidate(rules, form)
const errors = computed(() => useValidationErrors<IWindowForm>(v$.value.$errors))
const isValid = ref<boolean>(v$.value.$error)

const validate = async () => {
    const result = await v$.value.$validate()

    if (!result) {
        isValid.value = false
        return
    }

    isValid.value = true
}

function validateAndAddWindow(name: string) {

    validate()

    if (!isValid.value) return

    if (props.addWindow) {
        props.addWindow(name)
        v$.value.name.$model = ""
        v$.value.$reset()
    }
}

function validateAndUpdateWindow(name: string) {

    validate()

    if (props.updateWindow) {
        props.updateWindow(name)
    }
}

</script>

<template>
    <div
        class="form"
        @change="validate"
    >
        <h3 class="subtitle">{{ title }}</h3>
        <div class="form__inner">

            <InputName
                v-model="v$.name.$model"
                :is-error="v$.name.$error"
                :error="errors?.name"
            />
            <div class="form__buttons">
                <SubmitButton
                    v-if="addWindow"
                    :is-valid="v$.$error"
                    @click.left="validateAndAddWindow(v$.name.$model)"
                />
                <UpdateButton
                    v-if="updateWindow"
                    :is-valid="!isValid"
                    @click.left="validateAndUpdateWindow(v$.name.$model)"
                />
                <DeleteButton
                    v-if="deleteWindow"
                    @click.left="deleteWindow()"
                />
                <DiscardButton @click.left="discardChanges()" />
            </div>

        </div>
    </div></template>
