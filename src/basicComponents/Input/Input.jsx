import React from 'react';
import PropTypes from 'prop-types';

const getLabelClassName = () => {
    let baseClass = '';
    baseClass += 'block font-bold mb-2 text-sm';
    return baseClass;
};

const getInputClassName = () => {
    let baseClass = '';
    baseClass += 'block ';
    baseClass += 'outline-none border-b-2 border-orange-600 rounded-t-md ';
    baseClass += 'mb-8 px-2 py-1 ';
    baseClass += 'bg-gray-100 ';
    return baseClass;
};

const Input = (props) => {
    const {
        label, value, onChange, name, placeholder,
    } = props;

    const inputClassName = getInputClassName();

    const input = (
        <input
            className={inputClassName}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
        />
    );

    if (!label) {
        return input;
    }

    const labelClassName = getLabelClassName();

    const htmlFor = (() => {
        if (name) return name;
        if (label) return label;
        return '';
    })();

    return (
        <label
            className={labelClassName}
            htmlFor={htmlFor}
        >
            {label}
            {input}
        </label>
    );
};

Input.propTypes = {
    label: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    placeholder: PropTypes.string,
};

Input.defaultProps = {
    label: undefined,
    name: undefined,
    value: undefined,
    onChange: undefined,
    placeholder: undefined,
};

export default Input;
