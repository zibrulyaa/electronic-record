import { ref } from 'vue'
import axios from 'axios'

import type { Statistics } from '@/types'
import { STATISTICS_URL } from '@/constants'


export const useStatistics = () => {
    const statistics = ref<Statistics[]>()

    const GetStatisticsByWindowId = async () => {
        try {
            const responce = await axios.get(`${STATISTICS_URL}`)
            statistics.value = responce?.data
        }
        catch (error) {
            console.log(error)
        }
    }

    return {
        statistics,
        GetStatisticsByWindowId
    }
}