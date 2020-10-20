import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import gameTurnPropTypes from '../../utils/propTypes/gameTurnPropTypes';
import playerHandPropTypes from '../../utils/propTypes/playerHandPropTypes';
import PlayerCard from '../PlayerCard/PlayerCard';

const GameViewPlayerHUD = (props) => {
    const { currentTurn, playerHand, mustDiscard } = props;
    const {
        cards, deadCards, numCoins, turnNumber,
    } = playerHand;

    const { username } = useSelector((state) => state.user);

    const isMyTurn = currentTurn.number === turnNumber;

    return (
        <div className="bg-yellow-200 rounded-sm m-2 p-2 shadow-lg md:max-w-sm">
            <div>
                {username}
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
                    {deadCards.map((card) => (
                        <PlayerCard
                            card={card}
                            isDead
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
