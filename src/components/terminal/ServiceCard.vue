<script setup lang='ts'>
import type { Service } from '@/types/'
import { ref } from 'vue';

defineProps<{
    services: Service[],
}>()

const emit = defineEmits(['chooseService'])

const selectedServiceId = ref<string>()

const handleOnChange = (event: Event) => {
    emit('chooseService', event?.target?.value)
    selectedServiceId.value = event?.target?.value
}

</script>

<template>
    <ul class="cards__inner list-reset">
        <li
            v-for="service in services"
            :key="service.id"
        >
            <label
                class="card"
                :class="{ active: selectedServiceId === service.id }"
            >
                <input
                    class="visually-hidden"
                    type="radio"
                    @change="handleOnChange"
                    :value="service.id"
                    name="services"
                >
                <h3 class="card__title">{{ service.name }}</h3>
                <p class="card__description">{{ service.description }}</p>
        </label>
    </li>
</ul></template>
