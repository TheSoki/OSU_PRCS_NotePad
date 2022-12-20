import Zod from 'zod'

export const loginValidationSchema = Zod.object({
    email: Zod.string().email(),
    password: Zod.string().min(3).max(64),
})

export const registerValidationSchema = Zod.object({
    name: Zod.string().min(3).max(64),
    surname: Zod.string().min(3).max(64),
    password: Zod.string().min(3).max(64),
    email: Zod.string().email(),
    gender: Zod.number(),
})

export const createNoteValidationSchema = Zod.object({
    title: Zod.string().min(3).max(64),
    description: Zod.string().min(3).max(64),
})

export const editNoteValidationSchema = Zod.object({
    title: Zod.string().min(3).max(64),
    description: Zod.string().min(3).max(64),
    state: Zod.number(),
})
