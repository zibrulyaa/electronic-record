import { ref, onMounted } from 'vue'
import axios from 'axios'

import type { Client } from '@/types'
import { WINDOWS_URL } from '@/constants'


export const useClients = (windowId: string) => {
    const clients = ref<Client[]>()
    const client = ref<Client | null>(null)

    const getClientsByWindowId = async () => {
        try {
            const response = await axios.get(`${WINDOWS_URL}/${windowId}/clients`)
            clients.value = response?.data
        }
        catch (error) {
            console.log(error)
        }
    }

    const getCurrentClientAtWindow = async () => {
        try {
            const response = await axios.get(`${WINDOWS_URL}/${windowId}/clients`)
            client.value = response?.data.shift()
        }
        catch (error) {
            console.log(error)
        }
    }


    onMounted(() => getClientsByWindowId())

    return {
        clients,
        client,
        getCurrentClientAtWindow,
        getClientsByWindowId
    }
}