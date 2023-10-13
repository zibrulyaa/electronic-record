<script setup lang='ts'>
import { useRouter } from 'vue-router';

const router = useRouter()

function goBack() {
    router.go(-1)
}
</script>

<template>
    <button class="btn-reset back-btn"
            @click.left="goBack">Вернуться назад
    </button>
</template>

<style lang='scss' scoped>
@import '@/assets/scss/vars';
@import '@/assets/scss/mixins';

.back-btn {
    border: 2px solid $accent;
    padding: 16px;
    border-radius: 10px;
    position: absolute;
    top: 8px;

    &:hover {
        background-color: $accent-hover;
        color: $white;
    }
}
</style>