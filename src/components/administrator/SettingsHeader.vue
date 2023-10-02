<script setup lang='ts'>

import ArrowRightIcon from '@/components/icons/ArrowRightIcon.vue'
import { ROUTER_PATHS } from '@/constants';

interface Props {
    categoriesCount: string,
}
defineProps<Props>()

</script>

<template>
    <div class="settings">
        <h2 class="subtitle">Настройки</h2>
        <div class="settings__inner">
            <RouterLink class="card-setting" :to="ROUTER_PATHS.EDIT_CATEGORIES">
                <h3 class="card-setting__title">Услуги</h3>
                <div class="card-setting__inner">
                    <div class="card-setting__count">{{ categoriesCount }}</div>
                    <ArrowRightIcon />
                </div>
            </RouterLink>
            <RouterLink class="card-setting" :to="'/'">
                <h3 class="card-setting__title">Окна</h3>
                <div class="card-setting__inner">
                    <div class="card-setting__count">9</div>
                    <ArrowRightIcon />
                </div>
            </RouterLink>
            <RouterLink class="card-setting" :to="'/'">
                <h3 class="card-setting__title">Терминалы</h3>
                <div class="card-setting__inner">
                    <div class="card-setting__count">1</div>
                    <ArrowRightIcon />
                </div>
            </RouterLink>
        </div>
    </div>
</template>

<style lang='scss' scoped>
@import '@/assets/scss/vars';
@import '@/assets/scss/mixins';


.settings {

    // .settings__inner

    &__inner {
        display: flex;
        gap: 20px;
        margin-bottom: 64px;
    }
}



.card-setting {
    padding: 32px;
    max-width: 380px;
    width: 100%;
    background-color: $white;
    border-radius: 10px;
    box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.05);
    cursor: pointer;
    &:hover {
        padding: 31px;
        border: 1px solid $disabled;
    }

    // .card-setting__title

    &__title {
        margin-bottom: 10px;
        font-size: 18px;
        font-weight: 400;
        line-height: 140%;
    }

    // .card-setting__inner

    &__inner {
        display: flex;
        justify-content: space-between;
        align-items: end;
    }

    // .card-setting__count

    &__count {
        background-color: $accent;
        padding: 8px;
        min-width: 50px;
        text-align: center;
        color: $white;
        min-height: 50px;
        border-radius: 10px;
        font-size: 24px;
        font-style: normal;
        font-weight: 400;
        line-height: 140%;
    }
}
</style>