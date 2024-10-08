import React, { useState } from 'react';
import Button from '../../basicComponents/Button/Button';
import Card from '../../basicComponents/Card/Card';
import RuledHeader from '../../basicComponents/RuledHeader/RuledHeader';

import playerHandPropTypes from '../../utils/propTypes/playerHandPropTypes';
import useActions from '../GameViewBoard/useActions';
import PlayerCardChoice from '../PlayerCardChoice/PlayerCardChoice';

const cardIsChosen = (cardId, chosenCardIds) => chosenCardIds.includes(cardId);

const GameViewActionDiscard = (props) => {
    const { playerHand } = props;
    const { cards } = playerHand;

    const [chosenCardIds, setChosenCardIds] = useState([]);
    const addCard = (cardId) => {
        setChosenCardIds(chosenCardIds.concat(cardId));
    };
    const removeCard = (cardId) => {
        setChosenCardIds(chosenCardIds.filter((chosenCardId) => chosenCardId !== cardId));
    };

    const { discard } = useActions();

    const handleClick = () => {
        discard(chosenCardIds);
        setChosenCardIds([]);
    };

    const numChosenCards = chosenCardIds.length;
    const canChooseMore = numChosenCards < 1;

    return (
        <Card>
            <RuledHeader label="DISCARD" />
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
                        chosenLabel="Don't Discard"
                        notChosenLabel="Discard"
                    />
                ))}
            </div>
        </Card>
    );
};

GameViewActionDiscard.propTypes = {
    playerHand: playerHandPropTypes.isRequired,
};

export default GameViewActionDiscard;
