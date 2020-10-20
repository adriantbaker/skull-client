import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { GiTwoCoins as TwoCoins } from 'react-icons/gi';
import gameTurnPropTypes from '../../utils/propTypes/gameTurnPropTypes';
import playerHandPropTypes from '../../utils/propTypes/playerHandPropTypes';
import PlayerCard from '../PlayerCard/PlayerCard';

const GameViewPlayerHUD = (props) => {
    const { playerHand, mustDiscard } = props; // currentTurn
    const { cards, deadCards, numCoins } = playerHand; // turnNumber

    const { username } = useSelector((state) => state.user);

    // const isMyTurn = currentTurn.number === turnNumber;

    return (
        <div className="bg-yellow-200 rounded-sm m-2 p-2 shadow-lg md:max-w-sm">
            <div>
                {username}
            </div>
            <div className="flex justify-between">
                <div className="flex-grow space-y-1 w-1/2">
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
                <div className="flex-grow w-1/2">
                    <span>{numCoins}</span>
                    <span><TwoCoins className="inline ml-1" /></span>
                </div>
            </div>
        </div>
    );
};

GameViewPlayerHUD.propTypes = {
    // currentTurn: gameTurnPropTypes.isRequired,
    playerHand: playerHandPropTypes.isRequired,
    mustDiscard: PropTypes.bool.isRequired,
};

export default GameViewPlayerHUD;
