<script setup lang='ts'>
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';

import { WINDOWS_URL } from '@/constants';

import AppLayout from '@/components/AppLayout.vue'
import WindowForm from '@/components/administrator/windows/WindowForm.vue';
import { useWindows } from '@/composables/useWindows';

const route = useRoute()
const router = useRouter()

const windowId = computed((): string => route.params.windowId.toString())

const { window, GetWindowById } = useWindows()


GetWindowById(windowId.value)



//#region FormActions
const config = {
    headers: { 'content-type': 'application/json' },
}

async function updateWindow(name: string) {
    const data = {
        name
    }
    await axios.put(`${WINDOWS_URL}/${windowId.value}`, data, config)
        .then(() => closeForm())
        .catch(error => console.log(error))
}

async function deleteWindow() {
    await axios.delete(`${WINDOWS_URL}/${windowId.value}`)
        .then(() => closeForm())
        .catch(error => console.log(error))
}

function closeForm() {
    router.go(-1)
}

//#endregion
</script>

<template>
    <AppLayout>
        <div class="wrapper">
            <div
                class="content"
                v-if="window"
            >
                <WindowForm
                    title="Редактирование"
                    :update-window="updateWindow"
                    :delete-window="deleteWindow"
                    :current-name="window.name"
                    :discard-changes="closeForm"
                />
            </div>
            <div
                class="content"
                v-else
            >Загрузка...</div>
        </div>
    </AppLayout>
</template>

<style lang='scss' scoped>
@import '@/assets/scss/vars';
@import '@/assets/scss/mixins';


.categories-btn {
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