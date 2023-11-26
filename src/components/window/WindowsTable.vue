<script setup lang='ts'>
//#region Импорты

import 'swiper/css'
import 'swiper/css/pagination'


import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination, Autoplay } from 'swiper/modules'

import { useWindows } from '@/composables/useWindows'

import WindowColumn from './WindowColumn.vue'

//#endregion

//#region Слайдер

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

//#endregion

const { windows } = useWindows()

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
            <WindowColumn :window="window" />
        </swiper-slide>
    </swiper>
</template>

