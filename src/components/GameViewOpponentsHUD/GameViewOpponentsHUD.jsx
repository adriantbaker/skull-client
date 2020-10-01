import React from 'react';
import PlayerCard from '../PlayerCard/PlayerCard';

const getHUDClassName = (turnNumber, currentTurn) => {
    let className = 'w-1/2 sm:w-1/3 md:w-1/4';

    if (turnNumber === currentTurn) {
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
    const { playerTurn, currentTurn, opponentHands } = props;

    opponentHands.sort(
        sortByTurnOrder(
            playerTurn,
            opponentHands.length + 1,
        ),
    );

    return (
        <div className="flex flex-wrap">
            {opponentHands.map((oh, i) => (
                <div className={getHUDClassName(oh.turnNumber, currentTurn)}>
                    <div>
                        {oh.name}
                        {' '}
                        -
                        {' '}
                        {oh.turnNumber}
                    </div>
                    <div className="flex justify-between">
                        <div className="flex-grow">
                            <div>CARDS</div>
                            <PlayerCard type="?" />
                            <PlayerCard type="?" />
                        </div>
                        <div className="flex-grow">
                            <div>COINS</div>
                            <div>{oh.numCoins}</div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default GameViewOpponentsHUD;
