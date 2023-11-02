<script setup lang='ts'>
import 'swiper/css';
import 'swiper/css/grid';
import 'swiper/css/pagination';

import { useWindows } from '@/composables/useWindows'
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Pagination, Navigation, Grid } from 'swiper/modules'

import WindowCard from './WindowCard.vue';
const { windows } = useWindows()


const modules = [Pagination, Navigation, Grid]

const pagination = {
    clickable: true,
    renderBullet: function (index: number, className: string) {
        return '<span class="' + className + '">' + (index + 1) + '</span>';
    },
}

const grid = {
    fill: 'row',
    rows: 3,
}
</script>

<template>
    <div
        class="content"
        v-if="windows"
    >
        <h1 class="title">Выбрать окно</h1>
        <swiper
            class="windows__wrapper"
            :modules="modules"
            :grid="{
                fill: 'row',
                rows: 3
            }"
            :slides-per-view="3"
            :slides-per-group="9"
            :pagination="pagination"
        >
            <swiper-slide
                v-for="window in windows"
                :key="window.id"
            >
                <WindowCard :window="window" />
            </swiper-slide>
        </swiper>
    </div>

    <div
        class="empty"
        v-else
    >
        Загрузка...
    </div>
</template>

<style lang='scss'>
@import '@/assets/scss/vars';
@import '@/assets/scss/mixins';

.windows__wrapper {
    margin-top: 64px;

    .swiper-wrapper {
        display: flex;
        flex-wrap: wrap;
        gap: 20px;
        .swiper-slide {
            max-width: 380px;
            width: 100% !important;
            min-height: 102px;
            max-height: 102px;
        }
    }
}

.swiper-pagination {
    display: flex;
    justify-content: center;
    gap: 15px;
    position: absolute;
    bottom: 20px;

    &-bullet {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        font-size: 18px;
        color: $black;
        opacity: 1;
        background-color: $white;
        border: 1px solid $gray;

        &-active {
            background-color: $accent;
            color: $white;
            border: 1px solid $accent;
        }
    }

}
</style>