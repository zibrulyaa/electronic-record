<script setup lang='ts'>
import { computed, ref, onMounted } from 'vue'


const today = ref<Date>(new Date())

const localeDate = computed(() => {
    let hours = today.value.getHours().toLocaleString().padStart(2, '0')
    let minutes = today.value.getMinutes().toLocaleString().padStart(2, '0')
    let seconds = today.value.getSeconds().toLocaleString().padStart(2, '0')
    return `${hours}:${minutes}:${seconds}`
}
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