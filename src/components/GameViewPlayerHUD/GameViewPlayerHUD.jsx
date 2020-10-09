import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import gameTurnPropTypes from '../../utils/propTypes/gameTurnPropTypes';
import playerHandPropTypes from '../../utils/propTypes/playerHandPropTypes';
import PlayerCard from '../PlayerCard/PlayerCard';

const GameViewPlayerHUD = (props) => {
    const { currentTurn, playerHand, mustDiscard } = props;
    const { cards, numCoins, turnNumber } = playerHand;

    const { username } = useSelector((state) => state.user);

    const isMyTurn = currentTurn.number === turnNumber;

    return (
        <div>
            <div>
                {username}
                {' '}
                -
                {' '}
                {isMyTurn ? 'YOUR TURN' : null}
            </div>
            <div className="flex justify-between">
                <div className="flex-grow">
                    <div>CARDS</div>
                    {cards.map((card) => (
                        <PlayerCard
                            card={card}
                            canDiscard={mustDiscard}
                        />
                    ))}
                </div>
                <div className="flex-grow">
                    <div>COINS</div>
                    <div>{numCoins}</div>
                </div>
            </div>
        </div>
    );
};

GameViewPlayerHUD.propTypes = {
    currentTurn: gameTurnPropTypes.isRequired,
    playerHand: playerHandPropTypes.isRequired,
    mustDiscard: PropTypes.bool.isRequired,
};

export default GameViewPlayerHUD;
