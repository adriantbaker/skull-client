import React from 'react';
import PlayerCard from '../PlayerCard/PlayerCard';
import gameTurnPropTypes from '../../utils/propTypes/gameTurnPropTypes';
import playerHandPropTypes from '../../utils/propTypes/playerHandPropTypes';
import opponentHandsPropTypes from '../../utils/propTypes/opponentHandsPropTypes';

const getHUDClassName = (turnNumber, currentTurnNumber) => {
    let className = 'w-1/2 sm:w-1/3 md:w-1/4';

    if (turnNumber === currentTurnNumber) {
        className += ' border border-black';
    }

    return className;
};

const sortByTurnOrder = (playerTurn, numPlayers) => (p1, p2) => {
    let comp1 = p1.turnNumber - playerTurn;
    let comp2 = p2.turnNumber - playerTurn;
    if (comp1 < 0) comp1 += numPlayers;
    if (comp2 < 0) comp2 += numPlayers;
    return comp1 - comp2;
};

const GameViewOpponentsHUD = (props) => {
    const { playerHand, currentTurn, opponentHands } = props;

    const { turnNumber: playerTurnNumber } = playerHand;
    const { number: currentTurnNumber } = currentTurn;

    opponentHands.sort(
        sortByTurnOrder(
            playerTurnNumber,
            opponentHands.length + 1,
        ),
    );

    return (
        <div className="flex flex-wrap">
            {opponentHands.map((opponentHand) => {
                const {
                    id, turnNumber, numCoins, numCards, deadCards,
                } = opponentHand;

                const hiddenCards = [];
                for (let i = 0; i < numCards; i++) {
                    hiddenCards.push({
                        id: '',
                        type: '?',
                    });
                }

                return (
                    <div
                        key={id}
                        className={getHUDClassName(turnNumber, currentTurnNumber)}
                    >
                        <div>
                            {opponentHand.name}
                            {' '}
                            -
                            {' '}
                            {opponentHand.turnNumber}
                        </div>
                        <div className="flex justify-between">
                            <div className="flex-grow">
                                <div>CARDS</div>
                                {hiddenCards.map((card) => <PlayerCard card={card} />)}
                                {deadCards.map((card) => <PlayerCard card={card} />)}
                            </div>
                            <div className="flex-grow">
                                <div>COINS</div>
                                <div>{numCoins}</div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

GameViewOpponentsHUD.propTypes = {
    currentTurn: gameTurnPropTypes.isRequired,
    playerHand: playerHandPropTypes.isRequired,
    opponentHands: opponentHandsPropTypes.isRequired,
};

export default GameViewOpponentsHUD;
