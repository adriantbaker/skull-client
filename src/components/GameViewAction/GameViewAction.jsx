import React from 'react';
import PropTypes from 'prop-types';
import GameViewActionChoose from '../GameViewActionChoose/GameViewActionChoose';
import GameViewActionOutcome from '../GameViewActionOutcome/GameViewActionOutcome';
import GameViewActionWait from '../GameViewActionWait/GameViewActionWait';
import playerHandPropTypes from '../../utils/propTypes/playerHandPropTypes';
import gameTurnPropTypes from '../../utils/propTypes/gameTurnPropTypes';
import getMostRecentAction from '../../utils/logic/getMostRecentAction';
import opponentHandsPropTypes from '../../utils/propTypes/opponentHandsPropTypes';
import GameViewActionDiscard from '../GameViewActionDiscard/GameViewActionDiscard';
import GameViewActionExchange from '../GameViewActionExchange/GameViewActionExchange';
import getActionView, { actionViews } from '../../utils/logic/getActionView';
import GameViewTurnSummary from '../GameViewTurnSummary/GameViewTurnSummary';
import GameViewWon from '../GameViewWon/GameViewWon';

const GameViewAction = (props) => {
    const {
        playerHand,
        opponentHands,
        currentTurn,
        won,
        winnerName,
        winnerId,
    } = props;

    const { id: playerId, numCoins, cards } = playerHand;
    const {
        playerId: currentPlayerId,
        playerName: currentPlayerName,
        action: currentAction,
        block: currentBlock,
    } = currentTurn;

    const isPlayerTurn = playerId === currentPlayerId;
    const playerIsEliminated = cards.length === 0;

    // Determine the most recent action in this turn
    const mostRecentAction = getMostRecentAction(currentAction, currentBlock);

    const getViewComponent = () => {
        const view = getActionView(mostRecentAction, playerId, isPlayerTurn, playerIsEliminated);
        switch (view) {
            case actionViews.WAIT:
                if (won) {
                    return null;
                }
                return (
                    <GameViewActionWait
                        action={currentAction}
                        block={currentBlock}
                        currentPlayerName={currentPlayerName}
                    />
                );
            case actionViews.OUTCOME:
                return (
                    <GameViewActionOutcome
                        action={currentAction}
                        block={currentBlock}
                    />
                );
            case actionViews.CHOOSE:
                return (
                    <GameViewActionChoose
                        playerHand={playerHand}
                        opponentHands={opponentHands}
                        mostRecentAction={mostRecentAction}
                        numCoins={numCoins}
                    />
                );
            case actionViews.DISCARD:
                return (
                    <GameViewActionDiscard
                        playerHand={playerHand}
                    />
                );
            case actionViews.EXCHANGE:
                return (
                    <GameViewActionExchange
                        playerHand={playerHand}
                    />
                );
            default:
                return <div>?????</div>;
        }
    };

    return (
        <div className="flex flex-col justify-center flex-grow items-center">
            <div>{playerIsEliminated ? 'You have been eliminated.' : null}</div>
            {won ? (
                <GameViewWon
                    playerWon={playerId === winnerId}
                    winnerName={winnerName}
                />
            ) : null}
            <GameViewTurnSummary
                playerId={playerId}
                turn={currentTurn}
            />
            {getViewComponent()}
        </div>
    );
};

GameViewAction.propTypes = {
    playerHand: playerHandPropTypes.isRequired,
    currentTurn: gameTurnPropTypes.isRequired,
    opponentHands: opponentHandsPropTypes.isRequired,
    won: PropTypes.bool.isRequired,
    winnerName: PropTypes.string.isRequired,
    winnerId: PropTypes.string.isRequired,
};

export default GameViewAction;
