<script setup lang='ts'>
import { RouterLink, useRoute } from 'vue-router'
import { computed } from 'vue'

import { ROUTER_PATHS } from '@/constants'

import LogoIcon from './icons/LogoIcon.vue'
import TerminalIcon from '@/components/icons/TerminalIcon.vue'
import WindowsIcon from '@/components/icons/WindowsIcon.vue'
import EmployeIcon from '@/components/icons/EmployeIcon.vue'
import AdministratorIcon from '@/components/icons/AdministratorIcon.vue'


const route = useRoute()
const routeName = computed(() => route.name)


</script>

<template>
    <aside class="aside__menu">
        <div class="logo">
            <LogoIcon />
            <div class="logo__title">Электронная запись</div>
        </div>

        <nav class="menu">
            <ul class="list-reset menu__list">
                <li class="menu__list-item">
                    <RouterLink class="menu__list-link"
                        :class="{ active: routeName === ('/' || '/category' || '/category/:rid/services') ? true : false }"
                        :to="ROUTER_PATHS.TERMNINAL">
                        <TerminalIcon
                            :is-active="routeName === ('/' || '/category' || '/category/:rid/services') ? true : false" />
                        <span>Терминал</span>
                    </RouterLink>
                </li>
                <li class="menu__list-item">
                    <RouterLink class="menu__list-link" :class="{ active: routeName === '/windows' ? true : false }"
                        :to="ROUTER_PATHS.WINDOWS">
                        <WindowsIcon :is-active="routeName === '/windows' ? true : false" />
                        <span>Окно очереди</span>
                    </RouterLink>
                </li>
                <li class="menu__list-item">
                    <RouterLink class="menu__list-link" :class="{ active: routeName === '/employe' ? true : false }"
                        :to="ROUTER_PATHS.EMPLOYE">
                        <EmployeIcon :is-active="routeName === '/employe' ? true : false" />
                        <span>Сотрудники</span>
                    </RouterLink>
                </li>
                <li class="menu__list-item">
                    <RouterLink class="menu__list-link" :class="{ active: routeName === '/administrator' ? true : false }"
                        :to="ROUTER_PATHS.ADMINISTRATOR">
                        <AdministratorIcon :is-active="routeName === '/administrator' ? true : false" />
                        <span>Администратор</span>
                    </RouterLink>
                </li>
            </ul>
        </nav>
    </aside>
</template>

<style lang='scss' scoped>
@import '@/assets/scss/vars';
@import '@/assets/scss/mixins';

.aside {

    // .aside__menu

    &__menu {
        position: fixed;
        height: 100vh;
        left: 0;
        padding: 40px 16px;
        background-color: #fff;
        border-right: 1px solid $disabled;
        max-width: 200px;
    }
}

.logo {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 200px;

    // .logo__title

    &__title {
        font-size: 18px;
        font-weight: 700;
        line-height: 140%;
    }
}

.menu {

    // .menu__list-item

    &__list-item {
        &:not(:last-child) {
            margin-bottom: 24px;
        }
    }

    // .menu__list-link
    &__list-link {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 4px 16px 4px 8px;
        border-radius: 4px;
        font-size: 14px;
        font-weight: 400;
        line-height: 140%;
        color: $black;

        &:hover {
            background-color: $accent-hover;
        }

        &.active {
            background-color: $accent;
            color: $white;
        }
    }
}
</style>