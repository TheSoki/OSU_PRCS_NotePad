import axios from 'axios'
import classNames from 'classnames'
import { Form, Formik } from 'formik'
import { useState } from 'react'
import { toFormikValidationSchema } from 'zod-formik-adapter'
import { BACKEND_URL } from '../utils/helpers'
import { FormikField } from './FormikField'
import Router from 'next/router'
import Zod from 'zod'

type NoteType = {
    title: string
    description: string
}

const initialValues: NoteType = {
    title: '',
    description: '',
}

const noteValidationSchema = Zod.object({
    title: Zod.string(),
    description: Zod.string(),
})

export const CreateNote = () => {
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [isError, setIsError] = useState(false)

    const onSubmit = (values: NoteType) => {
        setIsSubmitted(true)
        try {
            axios(`${BACKEND_URL}/Note`, {
                method: 'POST',
                data: values,
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
