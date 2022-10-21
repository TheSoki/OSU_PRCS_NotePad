import React, { FC, HTMLInputTypeAttribute } from 'react'
import { Field, FieldAttributes } from 'formik'
import classNames from 'classnames'

type FormikFieldType = {
    name: string
    label?: string
    placeholder?: string
    type?: HTMLInputTypeAttribute
    disabled?: boolean
}

export const FormikField: FC<FormikFieldType> = ({
    name,
    placeholder,
    label,
    type,
    disabled,
}) => (
    <Field name={name}>
        {({ field, meta }: FieldAttributes<any>) => (
            <div className="mb-3 xl:w-96">
                {label && (
                    <label
                        htmlFor="exampleFormControlInpu3"
                        className="form-label inline-block mb-2 text-gray-700"
                    >
                        {label}
                    </label>
                )}
                <input
                    type={type || 'text'}
                    placeholder={placeholder ?? ''}
                    className={classNames(
                        'form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:outline-none',
                        {
                            'border-gray-300 focus:border-blue-600': !(
                                meta.touched && meta.error
                            ),
                            'border-red-500 focus:border-red-800':
                                meta.touched && meta.error,
                        }
                    )}
                    disabled={disabled}
                    {...field}
                />
                {meta.touched && meta.error && (
                    <div className="text-red-500 text-sm">{meta.error}</div>
                )}
            </div>
        )}
    </Field>
)
