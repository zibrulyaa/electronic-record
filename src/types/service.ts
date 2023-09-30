import type { Windows } from "./window"

export type Service = {
    id: string,
    categoryId: string,
    name: string,
    description: string,
    windows: Windows[],
    serviceTime: string
}