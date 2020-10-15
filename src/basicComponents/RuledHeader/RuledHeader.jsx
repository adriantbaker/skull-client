import React from 'react';
import PropTypes from 'prop-types';
import './RuledHeader.css';

const RuledHeader = ({ label }) => (
    <h2 className="ruled-header">
        <span>
            {label}
        </span>
    </h2>
);

RuledHeader.propTypes = {
    label: PropTypes.string.isRequired,
};

export default RuledHeader;
