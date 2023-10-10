import { ref, onMounted } from "vue"
import axios from "axios"

import type { Category } from '@/types';
import { CATEGORIES_URL } from '@/constants';


export const useCategories = () => {
    const categories = ref<Category[]>()
    const categoriesCount = ref<number>()

    const getCategories = async () => {
        try {
            const response = await axios.get(CATEGORIES_URL)
            categories.value = response?.data
            categoriesCount.value = categories.value?.length
        }
        catch (error) {
            console.log(error)
        }
    }

    onMounted(() => getCategories())

    return {
        categories,
        categoriesCount,
        getCategories
    }
}