<script setup lang='ts'>
import type { Client } from '@/types'

defineProps<{
    client: Client | null
}>()
</script>

<template>
    <div
        class="client__card"
        v-if="client"
    >
        <div class="client__service">Услуга {{ client.serviceId }}</div>
        <div class="client__info">
            Клиент
            <span class="client__number">{{ client.queueNumber }}</span>
        </div>
        <div class="client__datetime">
            <div class="client__time">{{ client.time }}</div>
            <div class="client__date">{{ client.date }}</div>
        </div>
    </div>
    <div
        class="client__card client__card-empty"
        v-else
    >
        <div class="client__card-text">Клиентов пока нет</div>
    </div>
</template>

<style lang='scss' scoped>
@import '@/assets/scss/vars';
@import '@/assets/scss/mixins';

.client {

    // .client__card

    &__card {
        padding: 32px;
        max-width: 584px;
        width: 100%;
        max-height: 360px;
        height: 360px;
        display: flex;
        gap: 46px;
        flex-direction: column;
        background-color: $white;
        border: 1px solid #EEE;
        box-shadow: 0px 20px 15px 0px rgba(0, 0, 0, 0.05);
        align-items: center;

        &-empty {
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 32px;
            font-weight: 400;
            line-height: 140%;
        }
    }

    // .client__service

    &__service {
        font-size: 32px;
        font-weight: 500;
        line-height: 140%;
    }

    &__info {
        text-align: center;
        font-size: 24px;
        font-weight: 400;
        line-height: 140%;
    }

    // .client__number

    &__number {
        display: block;
        font-size: 64px;
        font-weight: 500;
        line-height: 140%;
    }

    // .client__datetime

    &__datetime {
        width: 100%;
        display: flex;
        justify-content: space-between;
        font-size: 24px;
        font-weight: 400;
        line-height: 140%;
        color: $gray;
    }

    // .client__time

    &__time {}

    // .client__date

    &__date {}
}
</style>