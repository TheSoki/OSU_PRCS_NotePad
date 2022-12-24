import { Formik, FormikHelpers, Form } from 'formik'
import { FC, useState } from 'react'
import { toFormikValidationSchema } from 'zod-formik-adapter'
import { fetchEditUser } from '../utils/data'
import { UserType } from '../utils/types'
import { registerValidationSchema } from '../utils/validation'
import { FormikField } from './FormikField'
import { GenderFormikField } from './GenderFormikField'

export const UserListItem: FC<{ user: UserType; refetch: () => void }> = ({
    user,
    refetch,
}) => {
    const [displayPassword, setDisplayPassword] = useState(false)

    return (
        <div key={user.id} className="w-full py-2">
            <Formik<UserType>
                onSubmit={(
                    values: UserType,
                    actions: FormikHelpers<UserType>
                ) => {
                    try {
                        fetchEditUser(values).then(() => {
                            refetch()
                        })
                    } catch {}
                    actions.setSubmitting(false)
                }}
                initialValues={user}
                validationSchema={toFormikValidationSchema(
                    registerValidationSchema
                )}
            >
                {({ isSubmitting, dirty, setFieldValue }) => (
                    <Form className="flex space-x-2 justify-between items-center">
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
                        <FormikField
                            name="email"
                            placeholder="Email"
                            disabled
                        />
                        <div className="relative">
                            <FormikField
                                name="password"
                                type={displayPassword ? 'text' : 'password'}
                                placeholder="New Password"
                                disabled={isSubmitting}
                            />
                            <button
                                type="button"
                                onClick={() =>
                                    setDisplayPassword((prev) => !prev)
                                }
                                className="absolute right-0 top-0 mt-2 mr-3"
                            >
                                {displayPassword ? 'Hide' : 'Show'}
                            </button>
                        </div>
                        <GenderFormikField
                            name="gender"
                            disabled={isSubmitting}
                            onChange={(v) => setFieldValue('gender', v)}
                            defaultValue={user.gender}
                        />
                        <button
                            className="w-8 h-8 relative bottom-2"
                            type="submit"
                            disabled={isSubmitting}
                        >
                            {dirty ? '💾' : '✏️'}
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}
