<script setup lang='ts'>
import { ref, computed } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, minLength, maxLength, helpers, } from '@vuelidate/validators'

import SubmitButton from '@/components/form/SubmitButton.vue'
import DeleteButton from '@/components/form/DeleteButton.vue'
import DiscardButton from '@/components/form/DiscardButton.vue'
import UpdateButton from '@/components/form/UpdateButton.vue'

import InputName from '@/components/form/InputName.vue'
import InputDescription from '@/components/form/InputDescription.vue'
import { useValidationErrors } from '@/composables/useValidationErrors'


const props = withDefaults(defineProps<{
    title: string,
    currentName?: string,
    currentDescription?: string,
    addCategory?: Function | null,
    updateCategory?: Function | null,
    deleteCategory?: Function | null,
    discardChanges: Function
}>(), {
    currentName: "",
    currentDescription: "",
    addCategory: null,
    updateCategory: null,
    deleteCategory: null,
})

// Валидация

interface ICategoryForm {
    name: string,
    description: string
}

const form = ref<ICategoryForm>({
    name: props.currentName,
    description: props.currentDescription
})

const MIN_NAME_LENGTH = 3
const MAX_NAME_LENGTH = 12
const MIN_DESCRIPTION_LENGTH = 8
const MAX_DESCRIPTION_LENGTH = 48

const rules = {
    name: {
        required: helpers.withMessage("Поле является обязательным", required),
        minLength: helpers.withMessage(`Минимум ${MIN_NAME_LENGTH} символа`, minLength(MIN_NAME_LENGTH)),
        maxLength: helpers.withMessage(`Максимум ${MAX_NAME_LENGTH} символов`, maxLength(MAX_NAME_LENGTH))
    },
    description: {
        required: helpers.withMessage("Поле является обязательным", required),
        minLength: helpers.withMessage(`Минимум ${MIN_DESCRIPTION_LENGTH} символов`, minLength(MIN_DESCRIPTION_LENGTH)),
        maxLength: helpers.withMessage(`Максимум ${MAX_DESCRIPTION_LENGTH} символа`, maxLength(MAX_DESCRIPTION_LENGTH))
    }
}

const v$ = useVuelidate(rules, form)
const errors = computed(() => useValidationErrors<ICategoryForm>(v$.value.$errors))
const isValid = ref<boolean>(v$.value.$error)

const validate = async () => {
    const result = await v$.value.$validate()

    if (!result) {
        isValid.value = false
        return
    }

    isValid.value = true
}

function validateAndAddCategory(name: string, description: string) {

    validate()

    if (!isValid.value) return

    if (props.addCategory) {
        props.addCategory(name, description)
        v$.value.name.$model = ""
        v$.value.description.$model = ""
        v$.value.$reset()
    }
}

function validateAndUpdateCategory(name: string, description: string) {

    validate()

    if (props.updateCategory) {
        props.updateCategory(name, description)
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

            <InputDescription
                v-model="v$.description.$model"
                :is-error="v$.description.$error"
                :error="errors?.description"
            />

            <div class="form__buttons">
                <SubmitButton
                    v-if="addCategory"
                    :is-valid="v$.$error"
                    @click.left="validateAndAddCategory(v$.name.$model, v$.description.$model)"
                />
                <UpdateButton
                    v-if="updateCategory"
                    :is-valid="!isValid"
                    @click.left="validateAndUpdateCategory(v$.name.$model, v$.description.$model)"
                />
                <DeleteButton
                    v-if="deleteCategory"
                    @click.left="deleteCategory()"
                />
                <DiscardButton @click.left="discardChanges()" />
            </div>

        </div>
    </div></template>
