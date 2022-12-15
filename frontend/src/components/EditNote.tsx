import classNames from 'classnames'
import { Form, Formik, FormikHelpers } from 'formik'
import Router from 'next/router'
import { FC, useEffect, useState } from 'react'
import Zod from 'zod'
import { toFormikValidationSchema } from 'zod-formik-adapter'
import { BACKEND_URL } from '../utils/helpers'
import { FormikField } from './FormikField'
import { StateFormikField } from './StateFormikField'

const fetchNote = async (id: string): Promise<NoteType | null> => {
    return await fetch(`${BACKEND_URL}/Note/${id}`, {
        method: 'GET',
        credentials: 'include',
    })
        .then((res) => res.json())
        .then((data) => {
            if (data?.status) {
                return null
            }
            return data as NoteType
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

    const onSubmit = (values: NoteType, actions: FormikHelpers<NoteType>) => {
        setIsSubmitted(true)
        try {
            fetch(`${BACKEND_URL}/Note`, {
                method: 'PUT',
                headers: {
                    Accept: 'application/json, text/plain, */*',
                    'Content-Type': 'application/json;charset=utf-8',
                },
                body: JSON.stringify(values),
                credentials: 'include',
            }).then(() => {
                Router.push('/')
            })
        } catch {
            setIsError(true)
        }
        actions.setSubmitting(false)
    }

    useEffect(() => {
        fetchNote(id).then((note) => {
            setDefaultValue(note)
            setIsLoading(false)
        })
    }, [id])

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (defaultValue === null) {
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
                {({ isSubmitting, setFieldValue }) => (
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
                        <StateFormikField
                            name="state"
                            label="State"
                            disabled={isSubmitted || isSubmitting}
                            onChange={(v) => setFieldValue('state', v)}
                            defaultValue={defaultValue.state}
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
