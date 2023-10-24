<script setup lang='ts'>
import { computed, ref, onMounted } from 'vue'


const today = ref<Date>(new Date())

const localeDate = computed(() =>
    `${today.value.getHours().toLocaleString()}:${today.value.getMinutes().toLocaleString()}:${today.value.getSeconds().toLocaleString()}`
)

onMounted(() => {
    setInterval(() => {
        today.value = new Date()
    },
        1000
    )
})

</script>

<template>
    <p class="current__time">Время: {{ localeDate }}</p>
</template>

<style lang='scss' scoped>
@import '@/assets/scss/vars';
@import '@/assets/scss/mixins';

.current__time {
    font-size: 24px;
    font-style: normal;
    font-weight: 400;
    line-height: 140%;
}
</style>