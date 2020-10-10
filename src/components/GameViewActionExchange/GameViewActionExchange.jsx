import React, { useState } from 'react';
import Button from '../../basicComponents/Button/Button';

import playerHandPropTypes from '../../utils/propTypes/playerHandPropTypes';
import useActions from '../GameViewBoard/useActions';
import PlayerExchangeCard from '../PlayerExchangeCard/PlayerExchangeCard';

const cardIsChosen = (cardId, chosenCardIds) => chosenCardIds.includes(cardId);

const GameViewActionExchange = (props) => {
    const { playerHand } = props;
    const { cards, exchangeCards } = playerHand;

    const [chosenCardIds, setChosenCardIds] = useState([]);
    const addCard = (cardId) => {
        setChosenCardIds(chosenCardIds.concat(cardId));
    };
    const removeCard = (cardId) => {
        setChosenCardIds(chosenCardIds.filter((chosenCardId) => chosenCardId !== cardId));
    };

    const { exchange } = useActions();

    const handleClick = () => {
        exchange(chosenCardIds);
    };

    const numChosenCards = chosenCardIds.length;
    const canChooseMore = numChosenCards < 2;

    return (
        <div>
            <Button
                label="Confirm"
                disabled={canChooseMore}
                onClick={handleClick}
            />
            <div>
                CARDS IN HAND
                {cards.map((card) => (
                    <PlayerExchangeCard
                        card={card}
                        isChosen={cardIsChosen(card.id, chosenCardIds)}
                        canChooseMore={canChooseMore}
                        addCard={addCard}
                        removeCard={removeCard}
                    />
                ))}
            </div>
            <div>
                NEW CARDS
                {exchangeCards.map((card) => (
                    <PlayerExchangeCard
                        card={card}
                        isChosen={cardIsChosen(card.id, chosenCardIds)}
                        canChooseMore={canChooseMore}
                        addCard={addCard}
                        removeCard={removeCard}
                    />
                ))}
            </div>
        </div>
    );
};

GameViewActionExchange.propTypes = {
    playerHand: playerHandPropTypes.isRequired,
};

export default GameViewActionExchange;
