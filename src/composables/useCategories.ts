import { ref, onMounted } from "vue"
import axios from "axios"

import type { Category } from '@/types';
import { CATEGORIES_URL } from '@/constants';


export const useCategories = () => {
    const categories = ref<Category[] | null>(null)
    const categoriesCount = ref<string | null>()

    const getCategories = async () => {
        try {
            const response = await axios.get(CATEGORIES_URL)
            categories.value = response?.data
            categoriesCount.value = categories.value?.length.toString()
        }
        catch (error) {
            console.log(error)
            categories.value = null
            categoriesCount.value = null
        }
    }

    onMounted(() => getCategories())

    return {
        categories,
        categoriesCount,
        getCategories
    }
}