import { ref, onMounted } from "vue"
import axios from "axios"

import type { Category } from '@/types';
import { ALL_CATEGORIES_URL } from '@/constants';


export const useCategories = () => {
    const categories = ref<Category[] | null>()

    const getCategories = async () => {
        try {
            const response = await axios.get(`${ALL_CATEGORIES_URL}`)
            categories.value = response?.data
        }
        catch (error) {
            console.log(error)
            categories.value = null
        }
    }

    onMounted(() => getCategories())

    return {
        categories,
        getCategories
    }
}