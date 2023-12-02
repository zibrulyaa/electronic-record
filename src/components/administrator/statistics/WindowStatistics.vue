<script setup lang='ts'>
import type { Statistics } from '@/types'
import { computed, onMounted, ref, watch } from 'vue';

const props = defineProps<{
    statistics: Statistics
}>()

const minutes = computed(() => Math.floor(props.statistics.averageServiceTime / 60))

const setStatus = () => {
    if (minutes.value < 10) status.value = Status.low
    else if (minutes.value <= 35) status.value = Status.normal
    else status.value = Status.high
}

enum Status {
    low, normal, high
}

onMounted(() => {
    setStatus()
})

const status = ref<Status>(Status.normal)

const statusObject = computed(() => ({
    'statistics__value-low': status.value === Status.low,
    'statistics__value-normal': status.value === Status.normal,
    'statistics__value-high': status.value === Status.high
}))


watch(minutes, (minutes, oldMinutes) => {
    if (oldMinutes != minutes)
        setStatus()
})


</script>

<template>
    <div class="statistics__card">
        <div class="statistics__window">{{ statistics.id }} окно</div>
        <ul class="statistics__list list-reset">
            <li class="statistics__item">
                <div class="statistics__name">Частая услуга</div>
                <div class="statistics__value">{{ statistics.frequentServiceId }}</div>
            </li>
            <li class="statistics__item">
                <div class="statistics__name">Максимально клиентов</div>
                <div class="statistics__value">{{ statistics.maxClients }}</div>
            </li>
            <li class="statistics__item">
                <div class="statistics__name">Среднее время обслуживания</div>
                <div
                    class="statistics__value"
                    :class="statusObject"
                >{{ minutes }} мин</div>
            </li>
        </ul>
    </div>
</template>

<style lang='scss' scoped>
@import '@/assets/scss/vars';
@import '@/assets/scss/mixins';

.statistics {

    // .statistics__card

    &__card {
        padding: 32px 23px;
        background-color: $white;
        border-radius: 10px;
        box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.05);
    }

    // .statistics__window

    &__window {
        font-size: 32px;
        font-weight: 400;
        line-height: 140%;
        color: $accent;
        margin-bottom: 55px;
    }


    // .statistics__item

    &__item {
        display: flex;
        justify-content: space-between;
        font-size: 18px;
        font-weight: 400;
        line-height: 140%;

        &:not(:last-child) {
            margin-bottom: 16px;
        }
    }

    // .statistics__value

    &__value {
        &-normal {
            color: $accent;
        }

        &-low {
            color: $green;
        }

        &-high {
            color: $red
        }
    }
}
</style>