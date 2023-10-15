<script setup lang='ts'>
import { computed, ref } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, minLength, maxLength, helpers, } from '@vuelidate/validators'

import type { Window } from '@/types'
import { useValidationErrors } from '@/composables/useValidationErrors'

import SubmitButton from '@/components/form/SubmitButton.vue'
import DeleteButton from '@/components/form/DeleteButton.vue'
import DiscardButton from '@/components/form/DiscardButton.vue'
import UpdateButton from '@/components/form/UpdateButton.vue'

import InputName from '@/components/form/InputName.vue'
import InputDescription from '@/components/form/InputDescription.vue'
import InputTime from '@/components/form/InputTime.vue'
import MultiselectWindows from '@/components/form/MultiselectWindows.vue'



const props = withDefaults(defineProps<{
    title: string,
    currentName?: string,
    currentDescription?: string,
    currentSelectedWindows?: Window[],
    currentServiceTime?: string
    addService?: Function | null,
    updateService?: Function | null,
    deleteService?: Function | null,
    discardChanges: Function
}>(), {
    currentName: "",
    currentDescription: "",
    currentServiceTime: "",
    currentSelectedWindows: () => [],
    addService: null,
    updateService: null,
    deleteService: null,
})

defineEmits(['closeServiceForm'])

// Валидация


interface IServiceForm {
    name: string,
    description: string,
    serviceTime: string,
    selectedWindows: Window[]
}

const form = ref<IServiceForm>({
    name: props.currentName,
    description: props.currentDescription,
    selectedWindows: props.currentSelectedWindows,
    serviceTime: props.currentServiceTime
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
    },
    selectedWindows: {
        required: helpers.withMessage("Необходимо выбрать как минимум 1 окно", required)
    },
    serviceTime: {
        required: helpers.withMessage("Поле является обязательным", required)
    }
}

const v$ = useVuelidate(rules, form)
const errors = computed(() => useValidationErrors<IServiceForm>(v$.value.$errors))
const isValid = ref<boolean>(v$.value.$error)

const validate = async () => {
    const result = await v$.value.$validate()

    if (!result) {
        isValid.value = false
        return
    }

    isValid.value = true
}

function validateAndAddService(name: string, description: string, selectedWindows: Window[], serviceTime: string) {

    validate()

    if (!isValid.value) return

    if (props.addService) {
        props.addService(name, description, selectedWindows, serviceTime)
        v$.value.name.$model = ""
        v$.value.description.$model = ""
        v$.value.selectedWindows.$model = []
        v$.value.serviceTime.$model = ""
        v$.value.$reset()
    }
}

function validateAndUpdateService(name: string, description: string, selectedWindows: Window[], serviceTime: string) {

    validate()

    if (props.updateService) {
        props.updateService(name, description, selectedWindows, serviceTime)
    }
}

</script>

<template>
    <div
        class="form"
        @change="validate()"
    >
        <h3 class="subtitle">{{ title }}</h3>
        <div class="form__inner">
            <InputName
                v-model="v$.name.$model"
                :is-error="v$.name?.$error"
                :error="errors?.name"
            />
            <InputDescription
                v-model="v$.description.$model"
                :is-error="v$.description?.$error"
                :error="errors?.description"
            />
            <InputTime
                v-model="v$.serviceTime.$model"
                :is-error="v$.serviceTime?.$error"
                :error="errors?.serviceTime"
            />
            <MultiselectWindows
                v-model="v$.selectedWindows.$model"
                :is-error="v$.selectedWindows?.$error"
                :error="errors?.selectedWindows"
            />
            <div class="form__buttons">
                <SubmitButton
                    v-if="addService"
                    :is-valid="!isValid"
                    @click.left="validateAndAddService(v$.name.$model, v$.description.$model, v$.selectedWindows.$model, v$.serviceTime.$model)"
                />
                <UpdateButton
                    v-if="updateService"
                    :is-valid="!isValid"
                    @click.left="validateAndUpdateService(v$.name.$model, v$.description.$model, v$.selectedWindows.$model, v$.serviceTime.$model)"
                />
                <DeleteButton
                    v-if="deleteService"
                    @click.left="deleteService()"
                />
                <DiscardButton @click.left="discardChanges()" />
            </div>
        </div>
    </div>
</template>


<style src="@/../node_modules/vue-multiselect/dist/vue-multiselect.css"></style>


