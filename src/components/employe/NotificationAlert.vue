<script setup lang="ts">
defineProps<{
    message: string,
    isActive: boolean
}>()

defineEmits(['closeAlert'])
</script>

<template>
    <div class="notification"
         :class="{ active: isActive }">
        <p class="notification__message">{{ message }}</p>
        <div class="notification__btns">
            <button class="btn-reset notification__btn"
                    @click.left="$emit('closeAlert')">Ок</button>
        </div>
    </div>
</template>


<style lang="scss" scoped>
@import '@/assets/scss/vars';
@import '@/assets/scss/mixins';

.notification {
    position: absolute;
    z-index: 10;
    left: 50%;
    top: -140px;
    transform: translate(-50%, -140px);
    background-color: $white;
    border: 1px solid $gray;
    padding: 16px 24px;
    border-radius: 4px;
    max-width: 400px;
    width: 100%;
    transition: all .3s ease;


    &.active {
        top: 160px;
    }


    // .notification__message

    &__message {
        font-size: 18px;
        margin-bottom: 24px;
    }

    // .notification__btns

    &__btns {
        display: flex;
        flex-direction: row-reverse;
    }

    // .notification__btn

    &__btn {
        font-size: 18px;
        padding: 8px 16px;
        background-color: $accent;
        color: $white;
        border-radius: 4px;
        max-width: 64px;
        width: 100%;

        &:hover {
            background-color: $accent-hover;
        }
    }
}
</style>