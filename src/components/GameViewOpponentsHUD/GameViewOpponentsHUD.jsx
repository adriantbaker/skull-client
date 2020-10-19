import React from 'react';
import { useSelector } from 'react-redux';
import { GiTwoCoins as TwoCoins } from 'react-icons/gi';
import { FaSkullCrossbones as Skull } from 'react-icons/fa';
import PlayerCard from '../PlayerCard/PlayerCard';
import gameTurnPropTypes from '../../utils/propTypes/gameTurnPropTypes';
import playerHandPropTypes from '../../utils/propTypes/playerHandPropTypes';
import opponentHandsPropTypes from '../../utils/propTypes/opponentHandsPropTypes';
import { screenIsMobile } from '../../store/size/sizeActions';

const getHUDClassName = (turnNumber, currentTurnNumber, isCompact = false) => {
    let className;
    if (isCompact) {
        className = 'w-1/4 ';
    } else {
        className = 'w-1/2 sm:w-1/3 md:w-1/4 ';
    }
    className += 'bg-yellow-200 rounded-sm m-2 p-2 shadow-lg'; // TODO: make this reusable
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

    const { screenSize } = useSelector((state) => state.size);
    const isMobile = screenIsMobile(screenSize);

    opponentHands.sort(
        sortByTurnOrder(
            playerTurnNumber,
            opponentHands.length + 1,
        ),
    );

    if (isMobile) {
        return (
            <div className="flex">
                {opponentHands.map((opponentHand) => {
                    const {
                        turnNumber, name, numCoins, deadCards,
                    } = opponentHand;

                    const numDeadCards = deadCards.length;
                    const firstSkullActive = numDeadCards >= 1;
                    const secondSkullActive = numDeadCards === 2;

                    const getSkullOpacity = (isSkullActive) => (isSkullActive ? '' : 'opacity-25');

                    return (
                        <div
                            className={getHUDClassName(turnNumber, currentTurnNumber, true)}
                        >
                            <div>{name}</div>
                            <div>
                                <span>
                                    <Skull
                                        className={`inline ${getSkullOpacity(firstSkullActive)}`}
                                    />
                                </span>
                                <span>
                                    <Skull
                                        className={`inline ml-1 mr-6 ${getSkullOpacity(secondSkullActive)}`}
                                    />
                                </span>
                                <span>{numCoins}</span>
                                <span>
                                    <TwoCoins className="inline ml-1" />
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    }

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
