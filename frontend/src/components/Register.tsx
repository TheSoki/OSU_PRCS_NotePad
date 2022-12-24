import classNames from 'classnames'
import { Form, Formik, FormikHelpers } from 'formik'
import Router from 'next/router'
import { useState } from 'react'
import { toFormikValidationSchema } from 'zod-formik-adapter'
import { FormikField } from './FormikField'
import { registerValidationSchema } from '../utils/validation'
import { RegisterType } from '../utils/types'
import { fetchRegister } from '../utils/data'
import { GenderFormikField } from './GenderFormikField'

export const Register = () => {
    const [isError, setIsError] = useState(false)

    const [displayPassword, setDisplayPassword] = useState(false)

    const onSubmit = (
        values: RegisterType,
        actions: FormikHelpers<RegisterType>
    ) => {
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
                name: '',
                surname: '',
                password: '',
                email: '',
                gender: 0,
            }}
            validationSchema={toFormikValidationSchema(
                registerValidationSchema
            )}
        >
            {({ isSubmitting, setFieldValue }) => (
                <Form>
                    <FormikField
                        name="name"
                        placeholder="Name"
                        disabled={isSubmitting}
                    />
                    <FormikField
                        name="surname"
                        placeholder="Surname"
                        disabled={isSubmitting}
                    />
                    <GenderFormikField
                        name="gender"
                        disabled={isSubmitting}
                        onChange={(v) => setFieldValue('gender', v)}
                        defaultValue={0}
                    />
                    <FormikField
                        name="email"
                        type="email"
                        placeholder="Email"
                        disabled={isSubmitting}
                    />
                    <div className="relative">
                        <FormikField
                            name="password"
                            type={displayPassword ? 'text' : 'password'}
                            placeholder="Password"
                            disabled={isSubmitting}
                        />
                        <button
                            type="button"
                            onClick={() => setDisplayPassword((prev) => !prev)}
                            className="absolute right-0 top-0 mt-2 mr-3"
                        >
                            {displayPassword ? 'Hide' : 'Show'}
                        </button>
                    </div>
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
                        {isSubmitting ? 'Submitting...' : 'Submit'}
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
