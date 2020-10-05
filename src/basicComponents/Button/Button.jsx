import React from 'react';
import PropTypes from 'prop-types';

const getClassName = (buttonType) => {
    let baseClass = '';
    switch (buttonType) {
        case 'primary':
            baseClass += 'bg-orange-600 hover:bg-orange-500 focus:bg-orange-400 active:bg-orange-200 ';
            baseClass += 'text-white ';
            break;
        default:
            break;
    }
    baseClass += 'rounded-full px-4 py-2 transition duration-200 outline-none focus:outline-none';
    return baseClass;
};

const Button = (props) => {
    const { label, onClick } = props;
    const className = getClassName('primary');

    return (
        <button
            className={className}
            type="button"
            onClick={onClick}
        >
            {label}
        </button>
    );
};

Button.propTypes = {
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func,
};

Button.defaultProps = {
    onClick: undefined,
};

export default Button;
