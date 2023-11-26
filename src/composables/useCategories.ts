import { ref, onMounted } from "vue"
import axios, { AxiosError } from "axios"

import type { Category } from '@/types';
import { CATEGORIES_URL } from '@/constants';


export const useCategories = () => {
    const categories = ref<Category[]>()
    const categoriesCount = ref<number>()
    const errorObj = ref<AxiosError>()

    const getCategories = async () => {
        try {
            const response = await axios.get(CATEGORIES_URL)
            categories.value = response?.data
            categoriesCount.value = categories.value?.length
        }
        catch (error) {
            if (axios.isAxiosError(error)) {
                errorObj.value = error
            }
            else {
                console.log("Стандартная ошибка: " + error)
            }
        }
    }

    onMounted(() => getCategories())

    return {
        categories,
        categoriesCount,
        getCategories,
        errorObj
    }
}