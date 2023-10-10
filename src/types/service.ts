import type { Window } from "./window"

export type Service = {
    id?: string,
    categoryId: string,
    name: string,
    description: string,
    windows: Window[],
    serviceTime: string
}
