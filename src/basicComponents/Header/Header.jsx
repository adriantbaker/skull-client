import React from 'react';
import PropTypes from 'prop-types';

const Header = (props) => {
    const { h, children, className } = props;

    switch (h) {
        case '1':
            return <h1 className={`text-4xl font-bold ${className}`}>{children}</h1>;
        case '2':
            return <h2 className={`text-2xl font-bold ${className}`}>{children}</h2>;
        default:
            return <h3 className={`text-lg font-bold ${className}`}>{children}</h3>;
    }
};

Header.propTypes = {
    h: PropTypes.oneOf(['1', '2']).isRequired,
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
};

Header.defaultProps = {
    className: '',
};

export default Header;
