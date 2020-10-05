import React from 'react';
import PropTypes from 'prop-types';

const getClassName = (buttonType, isDisabled, isInline) => {
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
    baseClass += 'rounded-full px-4 py-2 transition duration-200 outline-none focus:outline-none';
    return baseClass;
};

const Button = (props) => {
    const {
        label, onClick, disabled, inline,
    } = props;

    const className = getClassName(
        'primary',
        disabled === true,
        inline,
    );

    return (
        <button
            className={className}
            type="button"
            onClick={onClick}
            disabled={disabled}
        >
            {label}
        </button>
    );
};

Button.propTypes = {
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
    inline: PropTypes.bool,
};

Button.defaultProps = {
    onClick: undefined,
    disabled: undefined,
    inline: false,
};

export default Button;
