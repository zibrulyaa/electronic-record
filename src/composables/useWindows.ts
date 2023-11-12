import { ref, onMounted } from 'vue'
import axios from 'axios'

import type { Window } from '@/types'
import { WINDOWS_URL } from '@/constants'


export const useWindows = () => {
    const windows = ref<Window[]>()
    const window = ref<Window>()
    const windowsCount = ref<number>()


    const getWindows = async () => {
        try {
            const response = await axios.get(WINDOWS_URL)
            windows.value = response?.data
            windowsCount.value = Number(windows.value?.length)
        }
        catch (error) {
            console.log(error)
        }
    }

    const GetWindowById = async (windowId: string) => {
        try {
            const responce = await axios.get(`${WINDOWS_URL}/${windowId}`)
            window.value = responce?.data
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
        window,
        windowsCount,
        getWindows,
        GetWindowById
    }
}