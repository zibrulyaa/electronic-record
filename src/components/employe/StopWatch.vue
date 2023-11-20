<script setup lang='ts'>
import { ref, computed } from 'vue';


defineExpose({
    start,
    stop
})

const timer = ref<number>(0)
const elapsedTime = ref<number>(0)

const formatedElapsedTime = computed((): string => {
    const totalTimeInMinutes = Math.floor(elapsedTime.value / 60)
    const totalTimeInSeconds = elapsedTime.value - totalTimeInMinutes * 60

    return `${totalTimeInMinutes} мин. ${totalTimeInSeconds} сек.`
})

function start() {
    timer.value = setInterval(() => {
        elapsedTime.value++
    }, 1000)
}

function stop() {
    clearInterval(timer.value)
    elapsedTime.value = 0
}


</script>

<template>
    <div class="stopwatch">{{ formatedElapsedTime }}</div>
</template>

<style lang='scss' scoped>
@import '@/assets/scss/vars';
@import '@/assets/scss/mixins';
</style>