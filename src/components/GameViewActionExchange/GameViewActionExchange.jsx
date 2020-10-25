import React, { useState } from 'react';
import Button from '../../basicComponents/Button/Button';
import Card from '../../basicComponents/Card/Card';
import RuledHeader from '../../basicComponents/RuledHeader/RuledHeader';

import playerHandPropTypes from '../../utils/propTypes/playerHandPropTypes';
import useActions from '../GameViewBoard/useActions';
import PlayerCardChoice from '../PlayerCardChoice/PlayerCardChoice';

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

    const numCardsInHand = cards.length;
    const numChosenCards = chosenCardIds.length;
    const canChooseMore = numChosenCards < numCardsInHand;

    return (
        <Card>
            <RuledHeader label="EXCHANGE" />
            <Button
                label="Confirm"
                disabled={canChooseMore}
                onClick={handleClick}
            />
            <div>
                CARDS IN HAND
                {cards.map((card) => (
                    <PlayerCardChoice
                        card={card}
                        isChosen={cardIsChosen(card.id, chosenCardIds)}
                        canChooseMore={canChooseMore}
                        addCard={addCard}
                        removeCard={removeCard}
                        chosenLabel="Don't Keep"
                        notChosenLabel="Keep"
                    />
                ))}
            </div>
            <div>
                NEW CARDS
                {exchangeCards.map((card) => (
                    <PlayerCardChoice
                        card={card}
                        isChosen={cardIsChosen(card.id, chosenCardIds)}
                        canChooseMore={canChooseMore}
                        addCard={addCard}
                        removeCard={removeCard}
                        chosenLabel="Don't Keep"
                        notChosenLabel="Keep"
                    />
                ))}
            </div>
        </Card>
    );
};

GameViewActionExchange.propTypes = {
    playerHand: playerHandPropTypes.isRequired,
};

export default GameViewActionExchange;
