import axios from 'axios'
import classNames from 'classnames'
import { Form, Formik } from 'formik'
import Router from 'next/router'
import { useState } from 'react'
import Zod from 'zod'
import { toFormikValidationSchema } from 'zod-formik-adapter'
import { BACKEND_URL } from '../utils/helpers'
import { FormikField } from './FormikField'

type LoginType = {
    email: string
    password: string
}

const initialValues: LoginType = {
    email: '',
    password: '',
}

const validationSchema = Zod.object({
    email: Zod.string().email(),
    password: Zod.string().min(3),
})

export const Login = () => {
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [isError, setIsError] = useState(false)

    const onSubmit = (values: LoginType) => {
        setIsSubmitted(true)
        try {
            axios(`${BACKEND_URL}/Auth/login`, {
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
            <Formik<LoginType>
                onSubmit={onSubmit}
                initialValues={initialValues}
                validationSchema={toFormikValidationSchema(validationSchema)}
            >
                {({ isSubmitting }) => (
                    <Form>
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
