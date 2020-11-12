import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Modal.css';
import { MdClose as Close } from 'react-icons/md';
import Button from '../Button/Button';
import Header from '../Header/Header';

const Modal = (props) => {
    const {
        title, children, trigger, triggerLabel,
    } = props;

    const initialOpen = !trigger;

    const [open, setOpen] = useState(initialOpen);

    const getModal = () => {
        if (!open) {
            return null;
        }
        return (
            <div className="modal-background">
                <div className="modal rounded-md bg-gradient-to-b from-teal-100 to-teal-200 shadow-lg">
                    {trigger ? (
                        <div>
                            <Close
                                size={20}
                                style={{ marginTop: 2, marginBottom: 2 }}
                                className="float-right"
                                onClick={() => setOpen(false)}
                            />
                        </div>
                    ) : null}
                    {title ? <Header>{title}</Header> : null}
                    <div className="mt-4">
                        {children}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <>
            {trigger ? (
                <Button
                    label={triggerLabel}
                    onClick={() => setOpen(true)}
                />
            ) : null}
            {getModal()}
        </>
    );
};

Modal.propTypes = {
    title: PropTypes.string,
    children: PropTypes.node,
    trigger: PropTypes.bool.isRequired,
    triggerLabel: PropTypes.string,
};

Modal.defaultProps = {
    title: null,
    children: null,
    triggerLabel: undefined,
};

export default Modal;
