import Zod from 'zod'

export const loginValidationSchema = Zod.object({
    email: Zod.string().email(),
    password: Zod.string().min(3),
})

export const registerValidationSchema = Zod.object({
    email: Zod.string().email(),
    password: Zod.string().min(3),
})

export const createNoteValidationSchema = Zod.object({
    title: Zod.string(),
    description: Zod.string(),
})

export const noteValidationSchema = Zod.object({
    title: Zod.string(),
    description: Zod.string(),
    state: Zod.number(),
})
