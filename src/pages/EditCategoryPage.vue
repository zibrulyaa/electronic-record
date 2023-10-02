<script setup lang='ts'>
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';

import { CATEGORIES_URL } from '@/constants';
import { useCategory } from '@/composables/useCategory'

import AppLayout from '@/components/AppLayout.vue';
import CategoryForm from '@/components/administrator/categories/CategoryForm.vue';

const route = useRoute()
const router = useRouter()

const categoryId = computed(() => route.path.split('/').pop())

const { category } = useCategory(categoryId.value)

const config = {
    headers: { 'content-type': 'application/json' },
}

async function updateCategory(name: string, description: string) {
    const formData = new FormData()
    formData.append('name', name)
    formData.append('description', description)
    await axios.put(`${CATEGORIES_URL}/${categoryId.value}`, formData, config)
    router.go(-1)
}

async function deleteCategory() {
    await axios.delete(`${CATEGORIES_URL}/${categoryId.value}`)
    router.go(-1)
}

</script>

<template>
    <AppLayout>
        <div class="wrapper">
            <div class="content"
                 v-if="category">
                <CategoryForm title="Редактирование"
                              :category-id="categoryId"
                              :submit-callback="updateCategory"
                              :additional-callback="deleteCategory"
                              :current-name="category.name"
                              :current-description="category.description" />
            </div>
            <div class="content"
                 v-else>Загрузка...</div>
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