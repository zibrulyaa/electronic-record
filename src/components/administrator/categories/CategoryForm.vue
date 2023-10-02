<script setup lang='ts'>
import SubmitButton from '@/components/form/SubmitButton.vue';
import DeleteButton from '@/components/form/DeleteButton.vue';
import DiscardButton from '@/components/form/DiscardButton.vue'
import { ref } from 'vue';

defineEmits(['closeForm'])

const props = withDefaults(defineProps<{
    title: string,
    submitCallback: Function,
    currentName?: string,
    currentDescription?: string,
    additionalCallback?: Function
}>(), {
    currentName: "",
    currentDescription: "",
    additionalCallback: () => { return null }
})

const name = ref<string>(props.currentName)
const description = ref<string>(props.currentDescription)

</script>

<template>
    <div class="form__inner">
        <h3 class="subtitle">{{ title }}</h3>
        <div class="form">
            <label class="label">
                <span class="label-title">Название</span>
                <input class="input-reset input" type="text" name="name" placeholder="Введите название" v-model="name" />
            </label>
            <label class="label">
                <span class="label-title">Описание</span>
                <input class="input-reset input" type="text" name="description" placeholder="Введите название"
                    v-model="description" />
            </label>
            <div class="form__btns">
                <SubmitButton @click.left="submitCallback(name, description)" />
                <DeleteButton v-show="additionalCallback" @click.left="additionalCallback()" />
                <DiscardButton text="Отменить" @click.left="$emit('closeForm')" />
            </div>
        </div>
    </div>
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

    &__btns {
        display: flex;
        gap: 20px;
    }
}
</style>