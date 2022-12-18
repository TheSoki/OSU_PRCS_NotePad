import classNames from 'classnames'
import { Form, Formik, FormikHelpers } from 'formik'
import Router from 'next/router'
import { useState } from 'react'
import { toFormikValidationSchema } from 'zod-formik-adapter'
import { FormikField } from './FormikField'
import { registerValidationSchema } from '../utils/validation'
import { RegisterType } from '../utils/types'
import { fetchRegister } from '../utils/data'

export const Register = () => {
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [isError, setIsError] = useState(false)

    const onSubmit = (
        values: RegisterType,
        actions: FormikHelpers<RegisterType>
    ) => {
        setIsSubmitted(true)
        try {
            fetchRegister(values).then((res) => {
                if (res.status !== 200) {
                    setIsError(true)
                    return
                }
                Router.push('/login')
            })
        } catch {
            setIsError(true)
        }
        actions.setSubmitting(false)
    }

    return (
        <Formik<RegisterType>
            onSubmit={onSubmit}
            initialValues={{
                email: '',
                password: '',
            }}
            validationSchema={toFormikValidationSchema(
                registerValidationSchema
            )}
        >
            {({ isSubmitting }) => (
                <Form>
                    <FormikField
                        name="username"
                        placeholder="Username"
                        disabled={isSubmitting}
                    />
                    <FormikField
                        name="email"
                        type="email"
                        placeholder="Email"
                        disabled={isSubmitting}
                    />
                    <FormikField
                        name="password"
                        type="password"
                        placeholder="Password"
                        disabled={isSubmitting}
                    />
                    <button
                        className={classNames(
                            'bg-blue-500 py-2 px-4 font-bold',
                            {
                                'hover:bg-blue-700 text-white border border-blue-700 rounded':
                                    !isSubmitting,
                                'text-white rounded opacity-50 cursor-not-allowed':
                                    isSubmitting,
                            }
                        )}
                        type="submit"
                        disabled={isSubmitting}
                    >
                        {isSubmitting
                            ? 'Submitting...'
                            : isSubmitted
                            ? 'Submitted'
                            : 'Submit'}
                    </button>
                    {isError && (
                        <div className="text-red-500 text-md">
                            Something went wrong
                        </div>
                    )}
                </Form>
            )}
        </Formik>
    )
}
