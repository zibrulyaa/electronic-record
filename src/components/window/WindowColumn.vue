<script setup lang='ts'>
import { useClients } from '@/composables/useClients';
import type { Window } from '@/types';

const props = defineProps<{
    window: Window
}>()
const { clients } = useClients(props.window.id)

const clientPosition = (rowIndex: number) => {
    if (!clients.value) return

    if (clients.value[rowIndex--])
        return clients.value[rowIndex--].queueNumber
    else
        return ""
}
</script>

<template>
    <div class="table__title">{{ window.name }}</div>
    <ul class="table__content list-reset">
        <li
            class="table__row"
            :class="{ current: row === 1 }"
            v-for="(row, index) in 9"
            :key="index"
        >
            <div class="table__row-text">
                {{ clientPosition(row) }}
            </div>
        </li>
    </ul>
</template>

<style lang='scss'>
@import '@/assets/scss/vars';
@import '@/assets/scss/mixins';


.table {
    display: grid;
    grid-template-columns: repeat(9, 1fr);
    text-align: center;
    height: 560px;

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

.swiper-pagination {
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

        &-active {
            background-color: $accent;
            color: $white;
            border: 1px solid $accent;
            cursor: default;
        }
    }

}
</style>@/composables/useClients