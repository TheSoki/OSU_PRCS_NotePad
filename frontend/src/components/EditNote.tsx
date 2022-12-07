import axios, { AxiosResponse } from 'axios'
import classNames from 'classnames'
import { Formik, Form } from 'formik'
import Router from 'next/router'
import { FC, useEffect, useState } from 'react'
import { toFormikValidationSchema } from 'zod-formik-adapter'
import { BACKEND_URL } from '../utils/helpers'
import { FormikField } from './FormikField'
import { noteValidationSchema } from './schema'
import { NoteType } from './types'

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
                data: {
                    ...values,
                    completeDate: new Date(values.completeDate).toISOString(),
                    creationDate: new Date(values.creationDate).toISOString(),
                },
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
    console.log(defaultValue)
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
                    <Form>
                        <FormikField
                            name="title"
                            placeholder="Title"
                            disabled={isSubmitted || isSubmitting}
                        />
                        <FormikField
                            name="description"
                            placeholder="Description"
                            disabled={isSubmitted || isSubmitting}
                        />
                        <FormikField
                            name="state"
                            type="number"
                            placeholder="State"
                            disabled={isSubmitted || isSubmitting}
                        />
                        <FormikField
                            name="completeDate"
                            type="date"
                            disabled={isSubmitted || isSubmitting}
                        />
                        <FormikField
                            name="creationDate"
                            type="date"
                            disabled={isSubmitted || isSubmitting}
                        />
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
                            Submit
                        </button>
                    </Form>
                )}
            </Formik>
            {isError && (
                <div className="text-red-500 text-md">Something went wrong</div>
            )}
        </>
    )
}
