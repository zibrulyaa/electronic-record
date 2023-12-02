<script setup lang='ts'>
import AppLayout from '@/components/AppLayout.vue'
import SettingsHeader from '@/components/administrator/SettingsHeader.vue'
import WindowStatistics from '@/components/administrator/statistics/WindowStatistics.vue'

import { useStatistics } from '@/composables/useStatistics'
import { onMounted, ref, onBeforeUnmount } from 'vue'

const { statistics, GetStatisticsByWindowId } = useStatistics()

const updateInterval = ref<number>(0)
const intervalTime = 15000
const isRefreshed = ref<boolean>(false)
const updateTime = ref<string>("")

onMounted(() => {
    GetStatisticsByWindowId()

    updateInterval.value = setInterval(() => {
        GetStatisticsByWindowId()
        isRefreshed.value = true
        const date = new Date()
        updateTime.value = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
    }, intervalTime)
})

onBeforeUnmount(() => {
    clearInterval(updateInterval.value)
    isRefreshed.value = false
})

</script>

<template>
    <AppLayout>
        <div class="wrapper">
            <SettingsHeader />
            <section class="statistics">
                <div class="statistics__header">
                    <h3 class="subtitle">Статистика</h3>
                    <div
                        class="statistics__update"
                        v-show="isRefreshed"
                    >Обновлено в {{ updateTime }}</div>
                </div>
                <div class="statistics__wrapper">
                    <WindowStatistics
                        v-for="data in statistics"
                        :key="data.id"
                        :statistics="data"
                    />
                </div>
            </section>
        </div>
    </AppLayout>
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