import axios, { AxiosResponse } from 'axios'
import classNames from 'classnames'
import { Form, Formik } from 'formik'
import Router from 'next/router'
import { FC, useEffect, useState } from 'react'
import Zod from 'zod'
import { toFormikValidationSchema } from 'zod-formik-adapter'
import { BACKEND_URL } from '../utils/helpers'
import { FormikField } from './FormikField'

const fetchNote = async (id: string): Promise<NoteType | null> => {
    return await axios(`${BACKEND_URL}/Note/${id}`, {
        method: 'GET',
        withCredentials: true,
    })
        .then((response: AxiosResponse<NoteType[]>) => {
            if (response.data.length === 0) {
                return null
            }
            return response.data[0]
        })
        .catch(() => {
            return null
        })
}

const noteValidationSchema = Zod.object({
    title: Zod.string(),
    description: Zod.string(),
    state: Zod.number(),
})

type NoteType = {
    id: string
    title: string
    description: string
    state: number
}

export const EditNote: FC<{ id: string }> = ({ id }) => {
    const [defaultValue, setDefaultValue] = useState<NoteType | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [isError, setIsError] = useState(false)

    const onSubmit = (values: NoteType) => {
        setIsSubmitted(true)
        try {
            axios(`${BACKEND_URL}/Note`, {
                method: 'PUT',
                data: values,
                withCredentials: true,
            })
            Router.push('/')
        } catch {
            setIsError(true)
        }
    }

    useEffect(() => {
        fetchNote(id)
            .then(setDefaultValue)
            .finally(() => {
                setIsLoading(false)
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (!defaultValue) {
        return <div>Not found</div>
    }

    return (
        <>
            <Formik<NoteType>
                onSubmit={onSubmit}
                initialValues={defaultValue}
                validationSchema={toFormikValidationSchema(
                    noteValidationSchema
                )}
                enableReinitialize
            >
                {({ isSubmitting }) => (
                    <Form className="w-min mx-auto">
                        <FormikField
                            name="title"
                            label="Title"
                            disabled={isSubmitted || isSubmitting}
                        />
                        <FormikField
                            name="description"
                            label="Description"
                            disabled={isSubmitted || isSubmitting}
                        />
                        <FormikField
                            name="state"
                            type="number"
                            label="State"
                            disabled={isSubmitted || isSubmitting}
                        />
                        <div className="flex justify-center">
                            <button
                                className={classNames(
                                    'bg-blue-500 py-2 px-4 font-bold',
                                    {
                                        'hover:bg-blue-700 text-white border border-blue-700 rounded':
                                            !(isSubmitted || isSubmitting),
                                        'text-white rounded opacity-50 cursor-not-allowed':
                                            isSubmitted || isSubmitting,
                                    }
                                )}
                                type="submit"
                                disabled={isSubmitted || isSubmitting}
                            >
                                {isSubmitting
                                    ? 'Submitting...'
                                    : isSubmitted
                                    ? 'Submitted'
                                    : 'Submit'}
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
            {isError && (
                <div className="text-red-500 text-md">Something went wrong</div>
            )}
        </>
    )
}
