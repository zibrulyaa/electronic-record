import { ref, onMounted } from 'vue'
import axios from 'axios'

import type { Window } from '@/types'
import { WINDOWS_URL } from '@/constants'


export const useWindows = () => {
    const windows = ref<Window[]>()


    const getWindows = async () => {
        try {
            const response = await axios.get(WINDOWS_URL)
            windows.value = response?.data
        }
        catch (error) {
            console.log(error)
        }
    }

    onMounted(() => {
        getWindows()
    })

    return {
        windows,
        getWindows
    }
}