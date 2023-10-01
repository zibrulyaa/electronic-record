<script setup lang='ts'>

interface Props {
    status: string | null
}
defineProps<Props>()


</script>

<template>
    <div class="popup">
        <div class="popup__inner" v-if="status !== null">
            <header class="popup__header">
                <h3 class="popup__title">✅ Успех</h3>
            </header>
            <p class="popup__text">Новая категория была успешно добавлена</p>
        </div>
        <div class="popup__inner" v-else>
            <h3 class="popup__title">⛔ Неудача</h3>
            <p class="popup__text">Новая категория не была добавлена</p>
        </div>
    </div>
</template>

<style lang='scss' scoped>
@import '@/assets/scss/vars';
@import '@/assets/scss/mixins';


.popup {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    background-color: $white;
    padding: 32px;
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
    max-width: 500px;
    width: 100%;
    box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.05);
    // .popup__inner

    &__inner {}

    // .popup__header

    &__header {
        display: flex;
        justify-content: space-between;
    }

    // .popup__title

    &__title {
        font-size: 24px;
        font-weight: 500;
        margin-bottom: 24px;
        text-align: left;
    }
    &__btn{
        width: 20px;
        height: 20px;
        border: 1px solid $black;
    }

    // .popup__text

    &__text {
        font-size: 18px;
        line-height: 140%;
    }
}
</style>