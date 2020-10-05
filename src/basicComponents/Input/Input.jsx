import React from 'react';
import PropTypes from 'prop-types';

const getLabelClassName = () => {
    let baseClass = '';
    baseClass += 'block font-bold mb-2 text-sm';
    return baseClass;
};

const getInputClassName = () => {
    let baseClass = '';
    baseClass += 'outline-none border-b-2 border-orange-600 ';
    baseClass += 'mb-8 p-1 ';
    baseClass += 'bg-gradient-to-r from-white to-gray-100 ';
    return baseClass;
};

const Input = (props) => {
    const {
        label, value, onChange, name,
    } = props;

    const labelClassName = getLabelClassName();
    const inputClassName = getInputClassName();

    const htmlFor = (() => {
        if (name) return name;
        if (label) return label;
        return '';
    });

    return (
        <label
            className={labelClassName}
            htmlFor={htmlFor}
        >
            {label}
            <input
                className={inputClassName}
                value={value}
                onChange={onChange}
            />
        </label>
    );
};

Input.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
};

Input.defaultProps = {
    name: undefined,
    value: undefined,
    onChange: undefined,
};

export default Input;
