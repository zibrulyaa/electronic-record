import { ref, onMounted } from "vue"
import axios from "axios"

import type { Service } from '@/types';
import { CATEGORIES_URL } from '@/constants';


export const useServices = (categoryId: string) => {
    const services = ref<Service[]>()

    const getServices = async () => {
        try {
            const response = await axios.get(`${CATEGORIES_URL}/${categoryId}/service`)
            services.value = response?.data
        }
        catch (error) {
            console.log(error)
        }
    }

    onMounted(() => getServices())

    return {
        services,
        getServices
    }
}