<script setup lang='ts'>
import type { Service } from '@/types/'
import { ref } from 'vue';

interface Props {
    services: Service[],
}
defineProps<Props>()

const emit = defineEmits(['chooseService'])

const selectedServiceId = ref<string>()

const handleOnChange = (event) => {
    emit('chooseService', event?.target?.value)
    selectedServiceId.value = event?.target?.value
}
console.log(selectedServiceId.value)

</script>

<template>
    <ul class="cards__inner list-reset">
        <li v-for="service in services" :key="service.id">
            <label class="card" :class="{ active: selectedServiceId === service.id }">
                <input class="visually-hidden" type="radio" @change="handleOnChange" :value="service.id" name="services">
                <h3 class="card__title">{{ service.name }}</h3>
                <p class="card__description">{{ service.description }}</p>
            </label>
        </li>
    </ul>
</template>

<style lang='scss' scoped>
@import '@/assets/scss/vars';
@import '@/assets/scss/mixins';
</style>