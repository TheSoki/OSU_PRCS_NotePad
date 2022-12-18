import {
    createNoteValidationSchema,
    loginValidationSchema,
    noteValidationSchema,
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

export type NoteType = Zod.infer<typeof noteValidationSchema>
