import classNames from 'classnames'
import { Form, Formik, FormikHelpers } from 'formik'
import { useState } from 'react'
import { toFormikValidationSchema } from 'zod-formik-adapter'
import { FormikField } from './FormikField'
import Router from 'next/router'
import { createNoteValidationSchema } from '../utils/validation'
import { CreateNoteType } from '../utils/types'
import { fetchCreateNote } from '../utils/data'

export const CreateNote = () => {
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [isError, setIsError] = useState(false)

    const onSubmit = (
        values: CreateNoteType,
        actions: FormikHelpers<CreateNoteType>
    ) => {
        setIsSubmitted(true)
        try {
            fetchCreateNote(values).then(() => {
                Router.push('/')
            })
        } catch {
            setIsError(true)
        }
        actions.setSubmitting(false)
    }

    return (
        <>
            <Formik<CreateNoteType>
                onSubmit={onSubmit}
                initialValues={{
                    title: '',
                    description: '',
                }}
                validationSchema={toFormikValidationSchema(
                    createNoteValidationSchema
                )}
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
