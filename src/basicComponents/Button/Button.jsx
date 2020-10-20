import React from 'react';
import PropTypes from 'prop-types';

const getClassName = (
    buttonType,
    isDisabled,
    isInline,
    inputClassName,
    size,
) => {
    let baseClass = '';
    switch (buttonType) {
        case 'primary':
            baseClass += 'bg-gradient-to-b from-orange-700 to-orange-600 ';
            baseClass += 'text-white ';
            if (!isDisabled) {
                baseClass += 'hover:from-orange-600 hover:to-orange-500 ';
                baseClass += 'focus:from-orange-500 focus:to-orange-400 ';
            }
            break;

        case 'secondary':
            baseClass += 'border border-black ';
            if (!isDisabled) {
                baseClass += 'hover:bg-white hover:bg-opacity-25 ';
            }
            break;

        default:
            break;
    }

    if (isDisabled) {
        baseClass += 'opacity-50 ';
        baseClass += 'cursor-not-allowed ';
    }

    if (!isInline) {
        baseClass += 'inline-block ';
    }

    switch (size) {
        case 'small':
            baseClass += 'px-2 ';
            break;
        case 'medium':
        default:
            baseClass += 'px-4 py-2 ';
            break;
    }

    baseClass += 'rounded-full transition duration-200 outline-none focus:outline-none shadow-md ';
    if (inputClassName) {
        baseClass += inputClassName;
    }
    return baseClass;
};

const Button = (props) => {
    const {
        label, onClick, disabled, inline, children, className, secondary, size,
    } = props;

    const buttonType = secondary ? 'secondary' : 'primary';

    const fullClassName = getClassName(
        buttonType,
        disabled === true,
        inline,
        className,
        size,
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
    size: PropTypes.oneOf(['small', 'normal']),
};

Button.defaultProps = {
    onClick: undefined,
    disabled: undefined,
    inline: false,
    children: undefined,
    className: undefined,
    secondary: false,
    size: 'normal',
};

export default Button;
