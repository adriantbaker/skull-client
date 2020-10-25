import React from 'react';
import PropTypes from 'prop-types';

const Card = (props) => {
    const { children, className } = props;

    const standardClassName = 'bg-yellow-200 rounded-sm m-2 p-2 shadow-lg md:w-1/2 self-stretch md:self-center ';

    return (
        <div className={`${standardClassName}${className}`}>
            {children}
        </div>
    );
};

Card.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
};

Card.defaultProps = {
    className: '',
    children: null,
};

export default Card;
