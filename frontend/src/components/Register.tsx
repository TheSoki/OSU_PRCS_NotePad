import classNames from 'classnames'
import { Form, Formik } from 'formik'
import Router from 'next/router'
import { useState } from 'react'
import Zod from 'zod'
import { toFormikValidationSchema } from 'zod-formik-adapter'
import { BACKEND_URL } from '../utils/helpers'
import { FormikField } from './FormikField'

type RegisterType = {
    username: string
    email: string
    password: string
}

const initialValues: RegisterType = {
    username: '',
    email: '',
    password: '',
}

const validationSchema = Zod.object({
    email: Zod.string().email(),
    password: Zod.string().min(3),
})

export const Register = () => {
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [isError, setIsError] = useState(false)

    const onSubmit = (values: RegisterType) => {
        setIsSubmitted(true)
        try {
            fetch(`${BACKEND_URL}/Auth/register`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json, text/plain, */*',
                    'Content-Type': 'application/json;charset=utf-8',
                },
                body: JSON.stringify(values),
                credentials: 'include',
            })
            Router.push('/login')
        } catch {
            setIsError(true)
        }
    }

    return (
        <>
            <Formik<RegisterType>
                onSubmit={onSubmit}
                initialValues={initialValues}
                validationSchema={toFormikValidationSchema(validationSchema)}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <FormikField
                            name="username"
                            placeholder="Username"
                            disabled={isSubmitted || isSubmitting}
                        />
                        <FormikField
                            name="email"
                            type="email"
                            placeholder="Email"
                            disabled={isSubmitted || isSubmitting}
                        />
                        <FormikField
                            name="password"
                            type="password"
                            placeholder="Password"
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
                            {isSubmitting
                                ? 'Submitting...'
                                : isSubmitted
                                ? 'Submitted'
                                : 'Submit'}
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
