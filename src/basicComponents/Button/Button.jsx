import React from 'react';
import PropTypes from 'prop-types';

const getClassName = (buttonType, isDisabled, isInline, inputClassName) => {
    let baseClass = '';
    switch (buttonType) {
        case 'primary':
            baseClass += 'bg-gradient-to-b from-orange-700 to-orange-600 ';
            baseClass += 'text-white ';
            if (isDisabled) {
                baseClass += 'opacity-50 ';
                baseClass += 'cursor-not-allowed ';
            } else {
                baseClass += 'hover:from-orange-600 hover:to-orange-500 ';
                baseClass += 'focus:from-orange-500 focus:to-orange-400 ';
            }
            break;
        case 'secondary':
            baseClass += 'border border-white ';
            baseClass += 'text-white ';
            baseClass += 'hover:bg-white hover:bg-opacity-25 ';
            break;
        default:
            break;
    }
    if (!isInline) {
        baseClass += 'inline-block ';
    }
    baseClass += 'rounded-full px-4 py-2 transition duration-200 outline-none focus:outline-none shadow-md ';
    if (inputClassName) {
        baseClass += inputClassName;
    }
    return baseClass;
};

const Button = (props) => {
    const {
        label, onClick, disabled, inline, children, className, secondary,
    } = props;

    const buttonType = secondary ? 'secondary' : 'primary';

    const fullClassName = getClassName(
        buttonType,
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
    secondary: PropTypes.bool,
};

Button.defaultProps = {
    onClick: undefined,
    disabled: undefined,
    inline: false,
    children: undefined,
    className: undefined,
    secondary: false,
};

export default Button;
