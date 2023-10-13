<script setup lang='ts'>
import { ref } from 'vue'

import type { Window } from '@/types'

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

const name = ref<string>(props.currentName)
const description = ref<string>(props.currentDescription)
const selectedWindows = ref<Window[]>(props.currentSelectedWindows)
const serviceTime = ref<string>(props.currentServiceTime)

defineEmits(['closeServiceForm'])

</script>

<template>
    <div class="form">
        <h3 class="subtitle">{{ title }}</h3>
        <div class="form__inner">
            <InputName v-model="name" />
            <InputDescription v-model="description" />
            <InputTime v-model="serviceTime" />
            <MultiselectWindows v-model="selectedWindows" />

            <div class="form__buttons">
                <SubmitButton v-if="addService"
                              @click.left="addService(name, description, selectedWindows, serviceTime)" />
                <UpdateButton v-if="updateService"
                              @click.left="updateService(name, description, selectedWindows, serviceTime)" />
                <DeleteButton v-if="deleteService"
                              @click.left="deleteService()" />
                <DiscardButton @click.left="discardChanges()" />
            </div>

        </div>
    </div>
</template>


<style src="@/../node_modules/vue-multiselect/dist/vue-multiselect.css"></style>


