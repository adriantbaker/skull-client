import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Modal.css';
import { MdClose as Close } from 'react-icons/md';
import Button from '../Button/Button';

const Modal = (props) => {
    const { title, children, triggerLabel } = props;

    const [open, setOpen] = useState(false);

    const getModal = () => {
        if (!open) {
            return null;
        }
        return (
            <div className="modal-background">
                <div className="modal rounded-md bg-gradient-to-b from-teal-100 to-teal-200 shadow-lg">
                    <div>
                        <Close
                            size={20}
                            style={{ marginTop: 2, marginBottom: 2 }}
                            className="float-right"
                            onClick={() => setOpen(false)}
                        />
                    </div>
                    {title ? <h1>{title}</h1> : null}
                    <div className="mt-4">
                        {children}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <>
            <Button
                label={triggerLabel}
                onClick={() => setOpen(true)}
            />
            {getModal()}
        </>
    );
};

Modal.propTypes = {
    title: PropTypes.string,
    children: PropTypes.node,
    triggerLabel: PropTypes.string.isRequired,
};

Modal.defaultProps = {
    title: null,
    children: null,
};

export default Modal;
