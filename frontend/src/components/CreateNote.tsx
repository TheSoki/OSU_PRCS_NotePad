import axios from 'axios'
import classNames from 'classnames'
import { Formik, Form } from 'formik'
import { useState } from 'react'
import Zod from 'zod'
import { toFormikValidationSchema } from 'zod-formik-adapter'
import { BACKEND_URL } from '../utils/helpers'
import { FormikField } from './FormikField'
import { noteValidationSchema } from './schema'
import { NoteType as NoteOriginalType } from './types'
import Router from 'next/router'

type NoteType = {
    title: Pick<NoteOriginalType, 'title'>['title']
    description: Pick<NoteOriginalType, 'description'>['description']
    creationDate: string
    completeDate: string
    state: Pick<NoteOriginalType, 'state'>['state']
}

const initialValues: NoteType = {
    title: '',
    description: '',
    state: 0,
    completeDate: '',
    creationDate: '',
}

export const CreateNote = () => {
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [isError, setIsError] = useState(false)

    const onSubmit = (values: NoteType) => {
        setIsSubmitted(true)
        try {
            axios(`${BACKEND_URL}/Note`, {
                method: 'POST',
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

    return (
        <>
            <Formik<NoteType>
                onSubmit={onSubmit}
                initialValues={initialValues}
                validationSchema={toFormikValidationSchema(
                    noteValidationSchema
                )}
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
