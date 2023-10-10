<script setup lang='ts'>
</script>

<template>
    <div class="wrapper">
        <h3 class="title-skeleton"></h3>
        <ul class="cards__inner list-reset">
            <div
                class="card-skeleton"
                v-for="key in 9"
                :key="key"
            >
                <h3 class="card-skeleton__title"></h3>
                <p class="card-skeleton__description"></p>
            </div>
        </ul>
    </div>
</template>

<style lang='scss' scoped>
@import '@/assets/scss/vars';
@import '@/assets/scss/mixins';

.card-skeleton {
    padding: 32px 16px;
    border: 3px solid $disabled;
    border-radius: 10px;
    max-width: 380px;
    min-width: 100%;
    transition: all .3s ease;
    text-align: left;
    max-height: 145px;


    // .card__title

    &__title {
        min-width: 60%;
        width: 60%;
        height: 45px;
        background-color: $disabled;
        border-radius: 10px;
        margin-bottom: 10px;
        background-image: linear-gradient(90deg, #ddd 0px, #e8e8e8 40px, #ddd 80px);
        background-size: 380px;
        animation: shine-lines 1.6s infinite linear;
    }

    // .card__description

    &__description {
        width: 90%;
        height: 25px;
        background-color: $disabled;
        border-radius: 10px;
        background-image: linear-gradient(90deg, #ddd 0px, #e8e8e8 40px, #ddd 80px);
        background-size: 380px;
        animation: shine-lines 1.6s infinite linear;
    }
}

.title-skeleton {
    display: inline-block;
    min-width: 700px;
    height: 40px;
    border-radius: 10px;
    background-image: linear-gradient(90deg, #ddd 0px, #e8e8e8 40px, #ddd 80px);
    background-size: 380px;
    animation: shine-lines 1.6s infinite linear;
    // margin: 0 auto;
    margin-bottom: 64px;
}


@keyframes shine-lines {
    0% {
        background-position: -100px;
    }

    40%,
    100% {
        background-position: 280px;
    }
}</style>