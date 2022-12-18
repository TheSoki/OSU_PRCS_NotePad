import {
    createNoteValidationSchema,
    loginValidationSchema,
    editNoteValidationSchema,
    registerValidationSchema,
} from './validation'

export type FormikFieldType = {
    name: string
    label?: string
    placeholder?: string
    disabled?: boolean
    onChange: (_: number) => void
    defaultValue: number
}

export type LoginType = Zod.infer<typeof loginValidationSchema>

export type RegisterType = Zod.infer<typeof registerValidationSchema>

export type CreateNoteType = Zod.infer<typeof createNoteValidationSchema>

export type EditNoteType = Zod.infer<typeof editNoteValidationSchema>

export type NoteType = {
    id: string
    title: string
    description: string
    creationDate: Date
    completeDate: Date | null
    state: number
}
