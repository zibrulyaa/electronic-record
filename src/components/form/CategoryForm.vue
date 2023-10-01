<script setup lang='ts'>
import FormInput from '@/components/form/FormInput.vue'
import FormButton from '@/components/form/FormButton.vue'
import SubmitPopup from './SubmitPopup.vue';


import { ALL_CATEGORIES_URL } from '@/constants';
import axios from 'axios';
import { ref } from 'vue';

const config = {
    headers: { 'content-type': 'application/json' },
}

const status = ref<string | null>(null)

async function sendNewCatagory(event) {

    const formData = new FormData()
    formData.append('name', event.target.elements[0].value)
    formData.append('description', event.target.elements[1].value)

    await axios.post(`${ALL_CATEGORIES_URL}`, formData, config)
        .then((responce) => { status.value = responce.status.toString() })

}

</script>

<template>
    <form ref="form" class="form" @submit.prevent="sendNewCatagory($event)">
        <h3 class="form__title">Новая категория</h3>
        <FormInput type="text" name="name" placeholder="Введите название" label="Название" />
        <FormInput type="text" name="description" placeholder="Введите описание" label="Описание" />
        <FormButton />
        {{ `Status: ${status}` }}
    </form>
    <SubmitPopup v-show="status" status="statusValue" />
</template>

<style lang='scss' scoped>
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
}
</style>