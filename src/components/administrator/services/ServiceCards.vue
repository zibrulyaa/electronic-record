<script setup lang='ts'>
import type { Service } from '@/types';
import { ROUTER_PATHS } from '@/constants';

import ArrowRightIcon from '@/components/icons/ArrowRightIcon.vue';

defineProps<{
    services: Service[],
    categoryId: string
}>()

defineEmits(['openServiceForm'])
</script>

<template>
    <ul class="services__list list-reset">
        <li
            class="service__card-add"
            @click.left="$emit('openServiceForm')"
        >Добавить услугу</li>
        <li
            class="service__card"
            v-for="service in services"
            :key="service.id"
        >
            <RouterLink :to="{
                name: ROUTER_PATHS.ADMINISTRATOR_SERVICE_EDIT,
                params: { categoryId: categoryId, serviceId: service.id }
            }">
                <header class="service__card-header">
                    <h3 class="service__card-title">{{ service.name }}</h3>
                    <ArrowRightIcon />
                </header>
                <ul class="service__card-content list-reset">
                    <li class="service__item">
                        <span class="service__item-title">Окна</span>
                        <ul class="service__item-values list-reset">
                            <li
                                class="service__item-value"
                                v-for="(window, index) in  service.windows "
                                :key="window.id"
                            >
                                <span>{{ window.id }}</span>
                                <span v-if="index + 1 < service.windows.length">,&nbsp;</span>
                            </li>
                        </ul>
                    </li>
                    <li class="service__item">
                        <span class="service__item-title">Время обслуживания</span>
                        <span class="service__item-value"> {{ service.serviceTime }} мин</span>
                    </li>
                </ul>
            </RouterLink>
        </li>
    </ul>
</template>

<style lang='scss' scoped>
@import '@/assets/scss/vars';
@import '@/assets/scss/mixins';

.services {

    // .services__list

    &__list {
        margin-top: 64px;
        display: flex;
        flex-wrap: wrap;
        gap: 20px;
    }
}

.service {

    // .service__card-add

    &__card-add {
        border-radius: 10px;
        border: 3px dashed $disabled;
        max-width: 380px;
        width: 100%;
        padding: 32px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: $accent;
        font-size: 24px;
        font-weight: 400;
        line-height: 140%;
        cursor: pointer;
        transition: all .1s ease-in;

        &:hover {
            border: 1px solid $accent;
            background-color: $accent;
            color: $white;
        }
    }

    // .service__card

    &__card {
        max-width: 380px;
        width: 100%;
        padding: 32px;
        background-color: $white;
        border-radius: 10px;
        box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.05);
        cursor: pointer;

        &:hover {
            padding: 31px;
            border: 1px solid $disabled;
        }
    }

    // .service__card-header

    &__card-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 24px;
    }

    // .service__card-title

    &__card-title {
        font-size: 24px;
        font-style: normal;
        font-weight: 400;
        line-height: 140%;
        color: $accent
    }

    // .service__card-content

    &__card-content {}

    // .service__item

    &__item {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    // .service__item-title

    &__item-title {
        font-size: 18px;
        line-height: 140%;
    }

    &__item-values {
        display: flex
    }

    // .service__item-value

    &__item-value {
        color: $accent;
        font-size: 18px;
        line-height: 140%;
    }
}
</style>