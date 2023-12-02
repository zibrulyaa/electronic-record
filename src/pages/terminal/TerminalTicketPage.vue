<script setup lang='ts'>
import AppLayout from '@/components/AppLayout.vue';
import type { Client } from '@/types';

</script>

<template>
    <AppLayout>
        <div class="wrapper">
            <header class="header">
                <h1 class="title">Ваш талон</h1>
            </header>
            <div class="ticket">
                <h3 class="ticket__service">Услуга 1</h3>
                <p class="ticket__number">A001</p>
                <div class="ticket__info">
                    <div class="ticket__windows">
                        Окна обслуживания
                        <span>1,3</span>
                    </div>
                    <div class="ticket__waittime">
                        Время ожидания
                        <span>~ 7 мин</span>
                    </div>
                </div>
                <div class="ticket__timestamp">
                    <div class="ticket__time"></div>
                    <div class="ticket__date"></div>
                </div>
            </div>
        </div>
    </AppLayout>
</template>

<style lang='scss' scoped>
@import '@/assets/scss/vars';
@import '@/assets/scss/mixins';
</style>