<script setup lang='ts'>
import 'swiper/css';
import 'swiper/css/pagination';

import { Swiper, SwiperSlide } from 'swiper/vue';
import { Pagination, Autoplay } from 'swiper/modules';

import { useWindows } from '@/composables/useWindows'
import { useQueue } from '@/composables/useQueue'

import type { Queue } from '@/types'

const { windows } = useWindows()
const { queue } = useQueue()


const clientPosition = (windowId: string, rowIndex: number) => {
    const windowQueue: Queue[] = []

    if (queue.value)
        for (const client of queue.value) {
            if (client.windowId === windowId) {
                windowQueue.push(client)
            }
        }

    if (windowQueue[rowIndex--])
        return  `A${windowQueue[rowIndex].queueNumber}`
    else return ""
}

const modules = [Pagination, Autoplay]

const pagination = {
    clickable: true,
    renderBullet: function (index: number, className: string) {
        return '<span class="' + className + '">' + (index + 1) + '</span>';
    },
}
const autoplay = {
    delay: 10000,
}

</script>



<template>
    <swiper
        class="table"
        :modules="modules"
        :autoplay="autoplay"
        :slides-per-view="9"
        :slides-per-group="9"
        :pagination="pagination"
    >
        <swiper-slide
            class="table__column"
            v-for="window in windows"
            :key="window.id"
        >
            <div class="table__title">{{ window.name }}</div>
            <ul class="table__content list-reset">
                <li
                    class="table__row"
                    :class="{ current: row === 1 }"
                    v-for="(row, index) in 9"
                    :key="index"
                >
                    <div class="table__row-text">
                        {{ clientPosition(window.id, row) }}
                    </div>
                </li>
            </ul>
        </swiper-slide>
    </swiper>
</template>

<style lang='scss' scoped>
@import '@/assets/scss/vars';
@import '@/assets/scss/mixins';


.table {
    display: grid;
    grid-template-columns: repeat(9, 1fr);
    text-align: center;

    &__title {
        background-color: $white;
        border: 2px solid $accent;
        padding: 10px;
        max-height: 45px;
        text-align: center;
        font-size: 18px;
        font-weight: 500;
        line-height: 140%;
        text-align: center;
    }

    &__row {
        background-color: $white;
        color: $gray;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 45px;
        max-height: 45px;

        &-text {
            font-size: 20px;
            font-style: normal;
            font-weight: 500;
            line-height: 140%;
        }

        &.current {
            color: $accent;
            font-weight: 700;
        }

        &:nth-child(even) {
            background-color: rgba(36, 108, 226, 0.25);
        }
    }
}



</style>