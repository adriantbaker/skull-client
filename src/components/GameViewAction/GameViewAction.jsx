import React from 'react';
import useGame from '../GameViewBoard/useGame';

const GameViewAction = (props) => {
    const { isYourTurn, currentAction = {}, currentBlock = {} } = props;
    const { tryAction } = useGame();
    const mustRespond = false;
    const {
        canChallenge, actionType, actingPlayerName, targetPlayerName,
    } = currentAction;
    const targetPlayer = 'Target Player';

    const getView = () => {
        if (isYourTurn) {
            return (
                <div>
                    <div>Your Options:</div>
                    <button type="button">Take Income</button>
                    <button
                        type="button"
                        onClick={() => tryAction('foreignAid')}
                    >
                        Take Foreign Aid

                    </button>
                </div>
            );
        }
        if (mustRespond) {
            return (
                <div>
                    <div>
                        {actingPlayerName}
                        {' '}
                        is attempting to
                        {' '}
                        {actionType}
                        {' '}
                        against YOU
                    </div>
                    <div>Your Options:</div>
                    <button type="button">Challenge</button>
                    <button type="button">Block</button>
                    <button type="button">Allow</button>
                </div>
            );
        }
        if (canChallenge) {
            return (
                <div>
                    <div>
                        {actingPlayerName}
                        {' '}
                        is attempting to
                        {' '}
                        {actionType}
                        {targetPlayerName ? ` against ${targetPlayerName}` : null}
                    </div>
                    {targetPlayerName ? <div>Waiting for Target to respond...</div> : null}
                    <div>Your Options:</div>
                    <button type="button">Challenge</button>
                    <button type="button">Block</button>
                    <button type="button">Allow</button>
                </div>
            );
        }
        return (
            <div>
                Waiting for TurnPlayer to make a move...
            </div>
        );
    };

    return (
        <div>
            {getView()}
        </div>
    );
};

export default GameViewAction;
