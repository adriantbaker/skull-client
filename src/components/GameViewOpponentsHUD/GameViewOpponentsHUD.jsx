import React from 'react';
import { useSelector } from 'react-redux';
import { GiTwoCoins as TwoCoins } from 'react-icons/gi';
import { FaSkullCrossbones as Skull } from 'react-icons/fa';
import PlayerCard from '../PlayerCard/PlayerCard';
import gameTurnPropTypes from '../../utils/propTypes/gameTurnPropTypes';
import playerHandPropTypes from '../../utils/propTypes/playerHandPropTypes';
import opponentHandsPropTypes from '../../utils/propTypes/opponentHandsPropTypes';
import { screenIsAtMost, screenIsMobile } from '../../store/size/sizeActions';
import getSkullColorClassName from '../../utils/styling/getSkullColorClassName';

const getHUDWrapperClassName = (isFirst = false, isCompact = false) => {
    let className = 'py-2 pr-2 ';

    if (isFirst) {
        className += 'pl-2 ';
    }

    if (isCompact) {
        className += 'w-1/4';
    } else {
        className += 'w-1/2 sm:w-1/3 md:w-1/4';
    }

    return className;
};

const getHUDClassName = (turnNumber, currentTurnNumber) => {
    let className = 'bg-yellow-200 rounded-sm p-2 shadow-lg'; // TODO: make this reusable

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

const getSkullClassName = (isDead, cardType) => {
    if (isDead) {
        return getSkullColorClassName(cardType);
    }
    return 'opacity-25';
};

const GameViewOpponentsHUD = (props) => {
    const { playerHand, currentTurn, opponentHands } = props;

    const { turnNumber: playerTurnNumber } = playerHand;
    const { number: currentTurnNumber } = currentTurn;

    const { screenSize } = useSelector((state) => state.size);
    const isMobile = screenIsMobile(screenSize);
    const isSmall = screenIsAtMost(screenSize, 'sm');
    const numOpponents = opponentHands.length;

    const isCompact = isMobile || (isSmall && numOpponents > 3);

    opponentHands.sort(
        sortByTurnOrder(
            playerTurnNumber,
            opponentHands.length + 1,
        ),
    );

    if (isCompact) {
        return (
            <div className="flex">
                {opponentHands.map((opponentHand, i) => {
                    const {
                        id, turnNumber, name, numCoins, deadCards,
                    } = opponentHand;

                    const numDeadCards = deadCards.length;
                    const firstSkullDead = numDeadCards >= 1;
                    const firstSkullType = firstSkullDead ? deadCards[0].type : null;
                    const secondSkullDead = numDeadCards === 2;
                    const secondSkullType = secondSkullDead ? deadCards[1].type : null;

                    return (
                        <div className={getHUDWrapperClassName(i === 0, true)}>
                            <div
                                key={id}
                                className={getHUDClassName(turnNumber, currentTurnNumber)}
                            >
                                <div>{name}</div>
                                <div>
                                    <span>
                                        <Skull
                                            className={`inline ${getSkullClassName(firstSkullDead, firstSkullType)}`}
                                        />
                                    </span>
                                    <span>
                                        <Skull
                                            className={`inline ml-1 sm:mr-6 ${getSkullClassName(secondSkullDead, secondSkullType)}`}
                                        />
                                    </span>
                                </div>
                                <div className="sm:inline">
                                    <span>{numCoins}</span>
                                    <span>
                                        <TwoCoins className="inline ml-1" />
                                    </span>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    }

    return (
        <div className="flex flex-wrap">
            {opponentHands.map((opponentHand, i) => {
                const {
                    id, turnNumber, numCoins, numCards, deadCards,
                } = opponentHand;

                const hiddenCards = [];
                for (let j = 0; j < numCards; j++) {
                    hiddenCards.push({
                        id: '',
                        type: '?',
                    });
                }

                return (
                    <div className={getHUDWrapperClassName(i === 0)}>
                        <div
                            key={id}
                            className={getHUDClassName(turnNumber, currentTurnNumber)}
                        >
                            <div>
                                {opponentHand.name}
                            </div>
                            <div className="flex justify-between">
                                <div className="flex-grow space-y-1 w-1/2">
                                    {hiddenCards.map((card) => (
                                        <PlayerCard
                                            card={card}
                                        />
                                    ))}
                                    {deadCards.map((card) => (
                                        <PlayerCard
                                            card={card}
                                            isDead
                                            isOpponentView
                                        />
                                    ))}
                                </div>
                                <div className="flex-grow w-1/2">
                                    <span>{numCoins}</span>
                                    <span>
                                        <TwoCoins className="inline ml-1" />
                                    </span>
                                </div>
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
