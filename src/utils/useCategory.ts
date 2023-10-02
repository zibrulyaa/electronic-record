import { ref, onMounted } from "vue"
import axios from "axios"

import type { Category } from '@/types';
import { CATEGORIES_URL } from '@/constants';


export const useCategory = (categoryId: string | null) => {
    const category = ref<Category | null>(null);

    const getCategory = async () => {
        try {
            const response = await axios.get(`${CATEGORIES_URL}/${categoryId}`)
            category.value = response?.data
        }
        catch (error) {
            console.log(error)
            category.value = null
        }
    }

    onMounted(() => getCategory())

    return {
        category,
        getCategory
    }
}