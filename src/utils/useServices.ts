import { ref, onMounted} from "vue"
import axios from "axios"

import type { Service } from '@/types';
import { ALL_CATEGORIES_URL } from '@/constants';


export const useServices = ( categoryId: string) => {
    const services = ref<Service[] | null>()

    const getServices = async () => {
        try {
            const response = await axios.get(`${ALL_CATEGORIES_URL}${categoryId}/service`)
            services.value = response?.data
        }
        catch (error) {
            console.log(error)
            services.value = null
        }
    }

    onMounted(() => getServices())

    return {
        services,
        getServices
    }
}