import React from 'react';
import PropTypes from 'prop-types';
import Modal from '../../basicComponents/Modal/Modal';
import Button from '../../basicComponents/Button/Button';

const GameViewWon = (props) => {
    const { playerWon, winnerName } = props;

    const getMessage = () => {
        if (playerWon) {
            return 'You Win!';
        }
        return `${winnerName} Wins!`;
    };

    return (
        <Modal title={getMessage()}>
            <Button>PLAY AGAIN</Button>
            <Button secondary>Back to Lobby</Button>
        </Modal>
    );
};

GameViewWon.propTypes = {
    playerWon: PropTypes.bool.isRequired,
    winnerName: PropTypes.string.isRequired,
};

export default GameViewWon;
