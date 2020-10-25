import React, { useState } from 'react';
import PropTypes from 'prop-types';
import gameActionPropTypes from '../../utils/propTypes/gameActionPropTypes';
import GameViewActionChooseButton from '../GameViewActionChooseButton/GameViewActionChooseButton';
import GameViewActionChooseTarget from '../GameViewActionChooseTarget/GameViewActionChooseTarget';
import opponentHandsPropTypes from '../../utils/propTypes/opponentHandsPropTypes';
import playerHandPropTypes from '../../utils/propTypes/playerHandPropTypes';
import determineChoiceLists from '../../utils/logic/determineChoiceLists';
import RuledHeader from '../../basicComponents/RuledHeader/RuledHeader';
import formatChoiceType from '../../utils/formatting/formatChoiceType';
import Card from '../../basicComponents/Card/Card';

const opponentIsInGame = (opponent) => opponent.numCards > 0;

const GameViewActionChoose = (props) => {
    const {
        mostRecentAction, numCoins, playerHand, opponentHands,
    } = props;
    const { cards } = playerHand;

    const { id: actionId, isBlock } = mostRecentAction || {};

    const choiceLists = determineChoiceLists(mostRecentAction, cards);

    const [mustChooseTarget, setMustChooseTarget] = useState(false);
    const [pendingChoice, setPendingChoice] = useState();

    const opponentsInGame = opponentHands.filter((opponent) => opponentIsInGame(opponent));

    if (mustChooseTarget) {
        return (
            <div>
                <GameViewActionChooseTarget
                    pendingChoice={pendingChoice}
                    opponentsInGame={opponentsInGame}
                />
            </div>
        );
    }

    return (
        <Card>
            {choiceLists.map((choiceList) => {
                const { type, choices } = choiceList;
                return (
                    <div>
                        <RuledHeader label={formatChoiceType(type)} />
                        <div className="grid grid-cols-2 md:grid-cols-1">
                            {choices.map((choice) => (
                                <div
                                    key={choice.type}
                                    className="p-1"
                                >
                                    <GameViewActionChooseButton
                                        choice={choice}
                                        actionId={actionId}
                                        actionIsBlock={isBlock}
                                        numCoins={numCoins}
                                        setMustChooseTarget={setMustChooseTarget}
                                        opponentsInGame={opponentsInGame}
                                        setPendingChoice={setPendingChoice}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                );
            })}
        </Card>
    );
};

GameViewActionChoose.propTypes = {
    mostRecentAction: gameActionPropTypes,
    numCoins: PropTypes.number.isRequired,
    playerHand: playerHandPropTypes.isRequired,
    opponentHands: opponentHandsPropTypes.isRequired,
};

GameViewActionChoose.defaultProps = {
    mostRecentAction: undefined,
};

export default GameViewActionChoose;
