import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import socket from '../../utils/api/socket';
import history from '../../utils/history/history';
import Modal from '../../basicComponents/Modal/Modal';
import Button from '../../basicComponents/Button/Button';
import { leaveGame } from '../../store/game/gameActions';

const GameViewWon = (props) => {
    const {
        roomId, playerId, winnerId, winnerName, closeModal,
    } = props;

    const playerWon = playerId === winnerId;

    const { ownGame } = useSelector((state) => state.game);

    const dispatch = useDispatch();

    const rejoinRoom = () => {
        closeModal();
        socket.emit('toggleReady', { roomId, playerId });
    };

    const joinLobby = () => {
        if (ownGame) {
            socket.emit('deleteGameRoom', { roomId });
            // response handled in GameView.jsx
        } else {
            socket.emit('leaveGameRoom', { roomId, playerId });
            socket.on('leaveGameRoomResponse', () => {
                history.push('/lobby');
                dispatch(leaveGame());
            });
        }
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
            <Button
                secondary
                onClick={() => joinLobby()}
            >
                {ownGame ? 'Disband Room' : 'Leave Room'}
            </Button>
        </Modal>
    );
};

GameViewWon.propTypes = {
    roomId: PropTypes.string.isRequired,
    playerId: PropTypes.string.isRequired,
    winnerId: PropTypes.string.isRequired,
    winnerName: PropTypes.string.isRequired,
    closeModal: PropTypes.func.isRequired,
};

export default GameViewWon;
