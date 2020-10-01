import React from 'react';
import { useSelector } from 'react-redux';
import PlayerCard from '../PlayerCard/PlayerCard';

const GameViewPlayerHUD = (props) => {
    const { currentTurn, playerHand } = props;
    const { cards, turnNumber } = playerHand;

    const { username } = useSelector((state) => state.user);

    const isMyTurn = currentTurn === turnNumber;

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
                        <PlayerCard type={card.type} />
                    ))}
                </div>
                <div className="flex-grow">
                    <div>COINS</div>
                    <div>2</div>
                </div>
            </div>
        </div>
    );
};

export default GameViewPlayerHUD;
