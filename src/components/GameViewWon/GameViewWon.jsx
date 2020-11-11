import React from 'react';
import PropTypes from 'prop-types';
import socket from '../../utils/api/socket';
import Modal from '../../basicComponents/Modal/Modal';
import Button from '../../basicComponents/Button/Button';

const GameViewWon = (props) => {
    const {
        roomId, playerId, winnerId, winnerName, closeModal, leaveButton,
    } = props;

    const playerWon = playerId === winnerId;

    const rejoinRoom = () => {
        closeModal();
        socket.emit('toggleReady', { roomId, playerId });
    };

    const getMessage = () => {
        if (playerWon) {
            return 'You Win!';
        }
        return `${winnerName} Wins!`;
    };

    return (
        <Modal title={getMessage()}>
            <Button
                onClick={() => rejoinRoom()}
            >
                PLAY AGAIN
            </Button>
            {leaveButton}
        </Modal>
    );
};

GameViewWon.propTypes = {
    roomId: PropTypes.string.isRequired,
    playerId: PropTypes.string.isRequired,
    winnerId: PropTypes.string.isRequired,
    winnerName: PropTypes.string.isRequired,
    closeModal: PropTypes.func.isRequired,
    leaveButton: PropTypes.node.isRequired,
};

export default GameViewWon;
