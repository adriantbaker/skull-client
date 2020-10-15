import React from 'react';
import PropTypes from 'prop-types';

const getClassName = (buttonType, isDisabled, isInline, inputClassName) => {
    let baseClass = '';
    switch (buttonType) {
        case 'primary':
            if (isDisabled) {
                baseClass += 'bg-gray-400 ';
                baseClass += 'text-gray-600 ';
                baseClass += 'cursor-not-allowed ';
            } else {
                baseClass += 'bg-orange-600 hover:bg-orange-500 focus:bg-orange-400 active:bg-orange-200 ';
                baseClass += 'text-white ';
            }
            break;
        default:
            break;
    }
    if (!isInline) {
        baseClass += 'inline-block ';
    }
    baseClass += 'rounded-full px-4 py-2 transition duration-200 outline-none focus:outline-none ';
    if (inputClassName) {
        baseClass += inputClassName;
    }
    return baseClass;
};

const Button = (props) => {
    const {
        label, onClick, disabled, inline, children, className,
    } = props;

    const fullClassName = getClassName(
        'primary',
        disabled === true,
        inline,
        className,
    );

    return (
        <button
            className={fullClassName}
            type="button"
            onClick={onClick}
            disabled={disabled}
        >
            {children || label}
        </button>
    );
};

Button.propTypes = {
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
    inline: PropTypes.bool,
    children: PropTypes.node,
    className: PropTypes.string,
};

Button.defaultProps = {
    onClick: undefined,
    disabled: undefined,
    inline: false,
    children: undefined,
    className: undefined,
};

export default Button;
