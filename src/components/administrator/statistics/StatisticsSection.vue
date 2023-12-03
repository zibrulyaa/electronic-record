<script setup lang='ts'>
//#region Импорты

import { onMounted, ref, onBeforeUnmount } from 'vue'

import { useStatistics } from '@/composables/useStatistics'

import WindowStatistics from '@/components/administrator/statistics/WindowStatistics.vue'

//#endregion


const { statistics, GetStatisticsByWindowId } = useStatistics()

const updateInterval = ref<number>(0)

const updateTime = ref<string>("")

onMounted(() => {
    // Обновление при первом рендере
    GetStatisticsByWindowId()
    setUpdatedTime()

    UpdateStatistics()
})


// Обновление времени
function setUpdatedTime() {
    const date = new Date()
    updateTime.value = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
}

// Обновление статистики каждые 15 секунд
function UpdateStatistics() {
    const intervalTime = 15000

    updateInterval.value = setInterval(() => {
        GetStatisticsByWindowId()
        setUpdatedTime()
    }, intervalTime)
}

onBeforeUnmount(() => {
    clearInterval(updateInterval.value)
})

</script>

<template>
    <section class="statistics">
        <header class="statistics__header">
            <h3 class="subtitle">Статистика</h3>
            <div class="statistics__update">Обновлено в {{ updateTime }}</div>
        </header>
        <div class="statistics__wrapper">
            <WindowStatistics
                v-for="data in statistics"
                :key="data.id"
                :statistics="data"
            />
        </div>
    </section>
</template>

<style lang='scss' scoped>
@import '@/assets/scss/vars';
@import '@/assets/scss/mixins';

.statistics {
    &__wrapper {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 20px;
        margin-bottom: 64px;
    }

    &__header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 32px;

        & .subtitle {
            margin-bottom: 0;
        }
    }
}
</style>