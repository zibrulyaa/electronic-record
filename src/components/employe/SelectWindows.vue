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
</script>

<template>
    <div class="content"
         v-if="windows">
        <h1 class="title">Выбрать окно</h1>
        <swiper class="windows__slider"
                :modules="modules"
                :pagination="pagination"
                :grid="{
                    fill: 'column',
                    rows: 9
                }"
                :space-between="20">
            <swiper-slide class="windows__slide"
                          v-for="window in windows"
                          :key="window.id">
                <WindowCard :window="window" />
            </swiper-slide>
        </swiper>
    </div>

    <div class="empty"
         v-else>
        Загрузка...
    </div>
</template>

<style lang='scss'>
@import '@/assets/scss/vars';
@import '@/assets/scss/mixins';

.windows__slider {
    margin-top: 64px;
    max-height: 470px;

    & .swiper-wrapper {
        flex-wrap: wrap;
        flex-direction: column;
        .swiper-slide {
            height: 102px;
            max-width: 380px;
            width: 100%;
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