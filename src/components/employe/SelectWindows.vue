<script setup lang='ts'>
import { computed, onMounted, onUpdated, ref } from 'vue';
import axios from 'axios';

import type { Window } from '@/types';
import { useWindows } from '@/composables/useWindows'
import { WINDOWS_URL } from '@/constants';

import WindowCard from './WindowCard.vue';
import { useRouter } from 'vue-router';

const router = useRouter()

const { windowsCount } = useWindows()
const windowsPerPage = ref<Window[]>()

const itemsPerPage = 9

const currentPage = ref<number>(1)

const pages = computed((): number => {
    if (!windowsCount.value) return 0
    return Math.ceil(windowsCount.value / itemsPerPage)
})


const getWindowsPerPage = async () => {
    updateFilters()
    const response = await axios.get(`${WINDOWS_URL}?page=${currentPage.value}&limit=${itemsPerPage}`)
    windowsPerPage.value = response?.data
}

function updateFilters() {
    router.push({
        name: '/employe',
        query:
        {
            page: currentPage.value
        }
    })
}

getWindowsPerPage()



function changePage(page: number) {
    currentPage.value = page
    updateFilters()
    getWindowsPerPage()
}

function EnterWindow(windowId: string, isBusy: boolean) {
    if (isBusy) {
        alert("Окно занято")
        return
    }

    router.push(`/employe/workspace/${windowId}`)
}



</script>

<template>
    <div
        class="content"
        v-if="windowsCount"
    >
        <h1 class="title">Выбрать окно</h1>
        <div class="windows__wrapper">
            <WindowCard
                v-for="window in windowsPerPage"
                :key="window.id"
                :window="window"
                @click.left="EnterWindow(window.id, window.isBusy)"
            />
        </div>
        <ul class="pagination">
            <li
                class="pagination-bullet"
                :class="{ active: page === currentPage }"
                v-for="page in pages"
                :key="page"
                @click.left="changePage(page)"
            >
                {{ page }}
            </li>
        </ul>
    </div>

    <div
        class="empty"
        v-else
    >
        Загрузка...
    </div>
</template>

<style lang='scss' scoped>
@import '@/assets/scss/vars';
@import '@/assets/scss/mixins';

.windows__wrapper {
    margin-top: 64px;
    max-height: 470px;

    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 1fr);
    gap: 20px;

}



.pagination {
    display: flex;
    justify-content: center;
    gap: 15px;

    &-bullet {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        font-size: 18px;
        color: $black;
        opacity: 1;
        background-color: $white;
        border: 1px solid $gray;
        cursor: pointer;

        &.active {
            background-color: $accent;
            color: $white;
            border: 1px solid $accent;
            cursor: default;
        }
    }

}
</style>