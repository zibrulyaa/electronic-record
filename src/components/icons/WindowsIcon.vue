<script setup lang='ts'>
interface Props {
    isActive: boolean
}
defineProps<Props>()
</script>

<template>
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
    >
        <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M3.5 2.75C3.08579 2.75 2.75 3.08579 2.75 3.5V20.5C2.75 20.9142 3.08579 21.25 3.5 21.25H20.5C20.9142 21.25 21.25 20.9142 21.25 20.5V3.5C21.25 3.08579 20.9142 2.75 20.5 2.75H3.5ZM1.25 3.5C1.25 2.25736 2.25736 1.25 3.5 1.25H20.5C21.7426 1.25 22.75 2.25736 22.75 3.5V20.5C22.75 21.7426 21.7426 22.75 20.5 22.75H3.5C2.25736 22.75 1.25 21.7426 1.25 20.5V3.5Z"
            :fill="isActive ? '#ffffff' : '#246CE2'"
        />
        <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M1.25 8.66675C1.25 8.25253 1.58579 7.91675 2 7.91675H22C22.4142 7.91675 22.75 8.25253 22.75 8.66675C22.75 9.08096 22.4142 9.41675 22 9.41675H2C1.58579 9.41675 1.25 9.08096 1.25 8.66675Z"
            :fill="isActive ? '#ffffff' : '#246CE2'"
    />
    <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M8.66699 7.91675C9.08121 7.91675 9.41699 8.25253 9.41699 8.66675V22.0001C9.41699 22.4143 9.08121 22.7501 8.66699 22.7501C8.25278 22.7501 7.91699 22.4143 7.91699 22.0001V8.66675C7.91699 8.25253 8.25278 7.91675 8.66699 7.91675Z"
        :fill="isActive ? '#ffffff' : '#246CE2'"
    />
</svg></template>

<style lang='scss' scoped>@import '@/assets/scss/vars';
@import '@/assets/scss/mixins';</style>