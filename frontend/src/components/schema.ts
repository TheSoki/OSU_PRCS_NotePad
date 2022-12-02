import Zod from 'zod'

export const noteValidationSchema = Zod.object({
    title: Zod.string(),
    description: Zod.string(),
    state: Zod.number(),
    completeDate: Zod.string(),
    creationDate: Zod.string(),
})
