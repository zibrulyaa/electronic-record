import { ref, onMounted } from 'vue'
import axios from 'axios'

import type { Queue } from '@/types'
import { QUEUE_URL } from '@/constants'


export const useQueue = () => {
    const queue = ref<Queue[]>()


    const getQueue = async () => {
        try {
            const response = await axios.get(QUEUE_URL)
            queue.value = response?.data
        }
        catch (error) {
            console.log(error)
        }
    }

    onMounted(() => {
        getQueue()
    })

    return {
        queue,
        getQueue
    }
}