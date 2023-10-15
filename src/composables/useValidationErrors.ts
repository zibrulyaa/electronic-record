import type { ErrorObject } from '@vuelidate/core'

export const useValidationErrors = <T extends Record<keyof T, any>>(errors: ErrorObject[]): Record<keyof T, string> => {
    return errors.reduce((acc, value) => {
        return { ...acc, [value.$property]: value.$message }
    }, {} as Record<keyof T, string>)
}