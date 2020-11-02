import React from 'react';
import PropTypes from 'prop-types';
import gameTurnPropTypes from '../../utils/propTypes/gameTurnPropTypes';
import formatTurnSummary from '../../utils/formatting/formatTurnSummary';

const GameViewTurnSummary = (props) => {
    const { turn, playerId } = props;

    if (!turn) return null;

    const { action, block, pastBlocks } = turn;
    const allBlocks = block ? pastBlocks.concat(block) : pastBlocks;

    const actionSummaries = formatTurnSummary(action, allBlocks, playerId);

    return (
        <div>
            {actionSummaries.map((summary) => {
                const { actionStr, challengeStr } = summary;
                return (
                    <div>
                        <div className="text-sm">{actionStr}</div>
                        {challengeStr ? <div className="text-xs">{challengeStr}</div> : null}
                    </div>
                );
            })}
        </div>
    );
};

GameViewTurnSummary.propTypes = {
    turn: gameTurnPropTypes.isRequired,
    playerId: PropTypes.string.isRequired,
};

export default GameViewTurnSummary;
