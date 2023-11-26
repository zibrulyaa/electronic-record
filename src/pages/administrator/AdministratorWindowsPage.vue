<script setup lang='ts'>
//#region Импорты

import { ref } from 'vue'
import axios from 'axios'

import type { Window } from '@/types'
import { WINDOWS_URL } from '@/constants'

import { useWindows } from '@/composables/useWindows'

import AppLayout from '@/components/AppLayout.vue'
import WindowCard from '@/components/administrator/windows/WindowCard.vue'
import WindowForm from '@/components/administrator/windows/WindowForm.vue'
import BackButton from '@/components/BackButton.vue'

//#endregion

const { windows, getWindows } = useWindows()


//#region FormActions

const isFormShown = ref<boolean>(false)

function openForm() {
    isFormShown.value = true
}

function closeForm() {
    getWindows()
    isFormShown.value = false
}

const config = {
    headers: { 'content-type': 'application/json' },
}

async function addWindow(name: string) {
    const data: Window = {
        name,
        isBusy: false,
    }
    await axios.post(WINDOWS_URL, data, config)
        .then(() => closeForm())
        .catch(error => console.log(error))
}

//#endregion

</script>

<template>
    <AppLayout>
        <div class="wrapper">
            <WindowForm
                title="Добавление нового окна"
                v-show="isFormShown"
                :add-window="addWindow"
                :discard-changes="closeForm"
            />
            <div
                class="content"
                v-if="windows"
                v-show="!isFormShown"
            >
                <header class="header">
                    <BackButton />
                    <div class="title">Настройки "Окна"</div>
                </header>
                <div class="categories">
                    <button
                        class="btn-reset categories__add-btn"
                        @click="openForm"
                    >
                        Добавить окно
                    </button>
                    <WindowCard :windows="windows" />
                </div>
            </div>
            <div
                class="content"
                v-else
            >Загрузка...
            </div>
        </div>
    </AppLayout>
</template>

<style lang='scss' scoped>
@import '@/assets/scss/vars';
@import '@/assets/scss/mixins';


.categories__add-btn {
    width: 100%;
    border-radius: 10px;
    border: 3px dashed $disabled;
    font-size: 24px;
    font-weight: 400;
    line-height: 140%;
    padding: 32px;
    color: $accent;
    margin-bottom: 64px;
    transition: all .3s ease;

    &:hover {
        border: 3px solid $accent;
        background-color: $accent;
        color: $white;
    }
}
</style>