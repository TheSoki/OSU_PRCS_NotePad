import { FC } from 'react'
import { Field, FieldAttributes } from 'formik'
import classNames from 'classnames'
import { FormikFieldType } from '../utils/types'

export const StateFormikField: FC<FormikFieldType> = ({
    name,
    placeholder,
    label,
    disabled,
    onChange,
    defaultValue,
}) => (
    <Field name={name}>
        {({ meta }: FieldAttributes<any>) => (
            <div className="mb-3 w-max md:w-96">
                {label && (
                    <label
                        htmlFor="exampleFormControlInpu3"
                        className="form-label inline-block mb-2 text-gray-700"
                    >
                        {label}
                    </label>
                )}
                <select
                    className={classNames(
                        'form-select block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 h-10 pl-2 outline-none',
                        {
                            'border-red-500 focus:border-red-800':
                                meta.touched && meta.error,
                        }
                    )}
                    placeholder={placeholder}
                    disabled={disabled}
                    onChange={(e) => {
                        onChange(Number(e.target.value))
                    }}
                    defaultValue={defaultValue?.toString()}
                >
                    <option value="0">To Do</option>
                    <option value="1">In Progress</option>
                    <option value="2">Done</option>
                </select>
                {meta.touched && meta.error && (
                    <div className="text-red-500 text-sm">{meta.error}</div>
                )}
            </div>
        )}
    </Field>
)
