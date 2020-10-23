import React, { useCallback } from 'react';
import style from './formik-multiselect-custom.module.scss';
import classNames from 'classnames';
import { useField } from 'formik';
import { FormikTextError } from '../formik-text-error';
import Select, { components } from 'react-select';
import { reactSelectStyles } from '~/helpers';

export const FormikMultiselectCustom = ({ items, wrapperClassName, className, ...outherProps }) => {
    const [field, meta, helpers] = useField(outherProps);
    const { setValue } = helpers;

    const Input = useCallback(props => (
        <components.Input {...props} name={field.name} />
    ), [field.name]);
    
    return (
        <div className={wrapperClassName}>
            <Select
                {...field}
                onChange={(selectedItems) => setValue(selectedItems || [])}
                isMulti
                components={{ Input }}
                placeholder='Тэги'
                noOptionsMessage={() => 'Пусто'}
                isValidNewOption={(_inputValue, selectValue) => selectValue.length < 6}
                styles={{
                    ...reactSelectStyles,
                    control: (styles, { isFocused }) => ({
                        ...reactSelectStyles.control(styles, { isFocused }),
                        border: meta.touched && meta.error ? '2px solid red' : '2px solid #1d1e22',
                    })
                }}
                options={items.sort(({ label: labelA }, { label: labelB }) =>
                    labelA < labelB ? -1 : labelA === labelB ? 0 : 1
                )}
                className={classNames(style['_'], { [className]: className })}
                classNamePrefix='formik-multiselect-custom'
            />
            <FormikTextError  touched={meta.touched} error={meta.error} />
        </div>
    );
};
