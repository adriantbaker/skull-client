import React from 'react';
import PropTypes from 'prop-types';

const getLabelClassName = () => {
    let baseClass = '';
    baseClass += 'block font-bold mb-2 text-sm';
    return baseClass;
};

const getBaseClass = (transparent) => {
    let baseClass = '';
    baseClass += 'outline-none border-1 border-orange-600 rounded-full ';
    baseClass += 'px-4 py-1 ';
    if (transparent) {
        baseClass += 'bg-white bg-opacity-75 ';
    } else {
        baseClass += 'bg-gray-100 ';
    }

    return baseClass;
};

const Input = (props) => {
    const {
        label, value, onChange, name, placeholder, transparent, className,
    } = props;

    const baseClass = getBaseClass(transparent);

    const fullClass = baseClass + className;

    const input = (
        <input
            className={fullClass}
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
    transparent: PropTypes.bool,
    className: PropTypes.string,
};

Input.defaultProps = {
    label: undefined,
    name: undefined,
    value: undefined,
    onChange: undefined,
    placeholder: undefined,
    transparent: false,
    className: '',
};

export default Input;
