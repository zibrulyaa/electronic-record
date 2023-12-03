<script setup lang='ts'>
//#region импорты

import ArrowRightIcon from '@/components/icons/ArrowRightIcon.vue'
import { ROUTER_PATHS } from '@/constants';

import { useCategories } from '@/composables/useCategories'
import { useWindows } from '@/composables/useWindows';

//#endregion

const { categoriesCount } = useCategories()
const { windowsCount } = useWindows()


</script>

<template>
    <div class="settings">
        <h2 class="subtitle">Настройки</h2>
        <ul class="settings__list list-reset">
            <li class="settings__element">
                <RouterLink
                    class="settings__element-link"
                    :to="ROUTER_PATHS.ADMINISTRATOR_CATEGORIES"
                >
                    <h3 class="settings__element-title">Услуги</h3>
                    <div class="settings__element-inner">
                        <div class="settings__element-count">{{ categoriesCount }}</div>
                        <ArrowRightIcon />
                    </div>
                </RouterLink>
            </li>
            <li class="settings__element">
                <RouterLink
                    class="settings__element-link"
                    :to="ROUTER_PATHS.ADMINISTRATOR_WINDOWS"
                >
                    <h3 class="settings__element-title">Окна</h3>
                    <div class="settings__element-inner">
                        <div class="settings__element-count">{{ windowsCount }}</div>
                        <ArrowRightIcon />
                    </div>
                </RouterLink>
            </li>
            <li class="settings__element">
                <RouterLink
                    class="settings__element-link"
                    :to="''"
                >
                    <h3 class="settings__element-title">Терминалы</h3>
                    <div class="settings__element-inner">
                        <div class="settings__element-count">1</div>
                        <ArrowRightIcon />
                    </div>
                </RouterLink>
            </li>
        </ul>
    </div>
</template>

<style lang='scss' scoped>
@import '@/assets/scss/vars';
@import '@/assets/scss/mixins';


.settings {

    // .settings__list

    &__list {
        display: flex;
        gap: 20px;
        margin-bottom: 64px;
    }

    // .settings__element

    &__element {
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

        // .settings__element-title

        &-title {
            margin-bottom: 10px;
            font-size: 18px; 
            font-weight: 400;
            line-height: 140%;
        }

        // .settings__element-inner

        &-inner {
            display: flex;
            justify-content: space-between;
            align-items: end;
        }

        //  .settings__element-count

        &-count {
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
}
</style>