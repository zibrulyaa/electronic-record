<script setup lang='ts'>
import { RouterLink } from 'vue-router'

import { ROUTER_PATHS } from '@/constants'

import LogoIcon from './icons/LogoIcon.vue'
import TerminalIcon from '@/components/icons/TerminalIcon.vue'
import WindowsIcon from '@/components/icons/WindowsIcon.vue'
import EmployeIcon from '@/components/icons/EmployeIcon.vue'
import AdministratorIcon from '@/components/icons/AdministratorIcon.vue'



</script>

<template>
    <aside class="aside__menu">
        <div class="logo">
            <LogoIcon class="menu__link-icon" />
            <div class="logo__title">Электронная запись</div>
        </div>

        <nav class="menu">
            <ul class="list-reset menu__list">
                <li class="menu__list-item">
                    <RouterLink
                        class="menu__list-link"
                        :to="ROUTER_PATHS.TERMNINAL"
                    >
                        <TerminalIcon class="menu__link-icon" />
                        <span class="menu__link-text">Терминал</span>
                    </RouterLink>
                </li>
                <li class="menu__list-item">
                    <RouterLink
                        class="menu__list-link"
                        :to="ROUTER_PATHS.WINDOWS"
                    >
                        <WindowsIcon class="menu__link-icon" />
                        <span class="menu__link-text">Очередь</span>
                    </RouterLink>
                </li>
                <li class="menu__list-item">
                    <RouterLink
                        class="menu__list-link"
                        :to="{ name: ROUTER_PATHS.EMPLOYE, params: { page: '1' } }"
                    >
                        <EmployeIcon class="menu__link-icon" />
                        <span class="menu__link-text">Сотрудники</span>
                    </RouterLink>
                </li>
                <li class="menu__list-item">
                    <RouterLink
                        class="menu__list-link"
                        :to="ROUTER_PATHS.ADMINISTRATOR"
                    >
                        <AdministratorIcon class="menu__link-icon" />
                        <span class="menu__link-text">Администратор</span>
                    </RouterLink>
                </li>
            </ul>
        </nav>
    </aside>
</template>

<style lang='scss' scoped>
@import '@/assets/scss/vars';
@import '@/assets/scss/mixins';



.logo {
    margin-bottom: 200px;
    max-width: 168px;
    height: 32px;
    display: flex;
    align-items: center;

    // .logo__title

    &__title {
        opacity: 0;
        max-width: 128px;
        width: 0;
        font-size: 18px;
        transition: all .3s ease-in-out;
    }
}


.aside {

    // .aside__menu

    &__menu {
        position: fixed;
        z-index: 10;
        border-right: 1px solid $disabled;
        background-color: $white;
        padding: 40px 16px;
        height: 100vh;
        width: 200px;
        transition: all .3s ease-in-out;
        transform: translateX(-144px);

        &:hover {
            transform: translateX(0px);
        }
    }
}

.menu {

    &__list {
        display: flex;
        flex-direction: column;
    }

    // .menu__list-item

    &__list-item:not(:last-child) {
        margin-bottom: 24px;
    }

    // .menu__list-link

    &__list-link {
        display: flex;
        align-items: center;
        flex-direction: row-reverse;
        justify-content: space-between;
        height: 32px;
        border-radius: 4px;
        padding: 3px 8px;
        padding-right: 0;
        border: 1px solid transparent;
        transition: all .3s ease-in-out;

        &:hover {
            border: 1px solid $accent;
        }
    }

    &__link-text {
        overflow-x: hidden;
        font-size: 14px;
        transition: all .6s ease-in-out;
    }
}

.menu__link-icon {
    max-width: 24px;
    max-height: 24px;
    width: 100% !important;
    height: 100% !important;
}


// Анимация меню

.aside__menu:hover .menu__link-text {
    overflow-x: visible;
    font-size: 14px;
}

.aside__menu:hover .menu__list-link {
    padding: 3px 8px;
    width: 100%;
}


// Анимация логотипа
.aside__menu:hover .logo__title {
    opacity: 1;
    font-size: 18px;
    font-weight: 700;
    margin-left: 10px;
}
</style>