import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import actionChoicePropTypes from '../../utils/propTypes/actionChoicePropTypes';
import Button from '../../basicComponents/Button/Button';
import formatActionType from '../../utils/formatting/formatActionType';
import useActions from '../GameViewBoard/useActions';
import opponentHandsPropTypes from '../../utils/propTypes/opponentHandsPropTypes';
import formatCardType from '../../utils/formatting/formatCardType';
import formatCardTypeCompact from '../../utils/formatting/formatCardTypeCompact';
import formatActionIcon from '../../utils/formatting/formatActionIcon';
import { screenIsMobile } from '../../store/size/sizeActions';

const GameViewActionChooseButton = (props) => {
    const {
        choice,
        actionId,
        actionIsBlock,
        numCoins,
        setMustChooseTarget,
        setPendingChoice,
        opponentsInGame,
    } = props;
    const {
        type, isBlock: choiceIsBlock, claimedCard, cost = 0, chooseTarget = false,
    } = choice;

    const {
        tryAction, tryBlock, acceptAction, challengeAction,
    } = useActions();
    const { screenSize } = useSelector((state) => state.size);
    const isMobile = screenIsMobile(screenSize);

    const canAfford = numCoins >= cost;

    const handleClick = () => {
        let targetId;

        if (chooseTarget) {
            if (opponentsInGame.length > 1) {
                // Display opponent choice view
                setMustChooseTarget(true);
                setPendingChoice(choice);
                return;
            }
            // Only 1 opponent, so choose automatically
            targetId = opponentsInGame[0].id;
        }

        if (type === 'allow') {
            acceptAction(actionId, actionIsBlock);
        } else if (type === 'challenge') {
            challengeAction(actionId, actionIsBlock);
        } else if (choiceIsBlock) {
            tryBlock(actionId, type, claimedCard);
        } else {
            tryAction(type, claimedCard, targetId);
        }
    };

    const formattedType = formatActionType(type);
    const typeIcon = isMobile ? null : formatActionIcon(type, 'inline ml-2');

    if (!choiceIsBlock || !claimedCard) {
        return (
            <Button
                className="w-full"
                onClick={handleClick}
                disabled={!canAfford}
            >
                <span className="text-sm">{formattedType}</span>
                {typeIcon}
            </Button>
        );
    }

    const formattedRole = ` (as ${formatCardType(claimedCard)})`;
    const formattedRoleCompact = ` (${formatCardTypeCompact(claimedCard)})`;

    return (
        <div>
            <Button
                className="w-full"
                onClick={handleClick}
                disabled={!canAfford}
            >
                <div>
                    <span className="text-xs sm:text-sm">{formattedType}</span>
                    <span className="hidden sm:inline text-xs">{formattedRole}</span>
                    <span className="sm:hidden text-xs">{formattedRoleCompact}</span>
                </div>
            </Button>
        </div>
    );
};

GameViewActionChooseButton.propTypes = {
    choice: PropTypes.shape(actionChoicePropTypes).isRequired,
    actionId: PropTypes.string,
    actionIsBlock: PropTypes.bool,
    numCoins: PropTypes.number.isRequired,
    setMustChooseTarget: PropTypes.func.isRequired,
    setPendingChoice: PropTypes.func.isRequired,
    opponentsInGame: opponentHandsPropTypes.isRequired,
};

GameViewActionChooseButton.defaultProps = {
    actionId: undefined,
    actionIsBlock: false,
};

export default GameViewActionChooseButton;
