<script setup lang='ts'>
import { ref } from 'vue';

import SubmitButton from '@/components/form/SubmitButton.vue'
import DeleteButton from '@/components/form/DeleteButton.vue'
import DiscardButton from '@/components/form/DiscardButton.vue'
import UpdateButton from '@/components/form/UpdateButton.vue'

import InputName from '@/components/form/InputName.vue'
import InputDescription from '@/components/form/InputDescription.vue';


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

const name = ref<string>(props.currentName)
const description = ref<string>(props.currentDescription)
</script>

<template>
    <div class="form">
        <h3 class="subtitle">{{ title }}</h3>
        <div class="form__inner">
            <InputName v-model="name" />
            <InputDescription v-model="description" />
            <div class="form__buttons">
                <SubmitButton v-if="addCategory"
                              @click.left="addCategory(name, description)" />
                <UpdateButton v-if="updateCategory"
                              @click.left="updateCategory(name, description)" />
                <DeleteButton v-if="deleteCategory"
                              @click.left="deleteCategory()" />
                <DiscardButton @click.left="discardChanges()" />
            </div>
        </div>
    </div>
</template>

<style lang='scss' scoped>
@import '@/assets/scss/vars';
@import '@/assets/scss/mixins';
</style>
