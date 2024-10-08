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
import { actionTypes, respondTypes } from '../../utils/propTypes/gameActionPropTypes';

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
        type,
        isBlock: choiceIsBlock,
        isRespond: choiceIsRespond,
        claimedCard,
        cost = 0,
        chooseTarget = false,
    } = choice;

    const {
        tryAction, tryBlock, acceptAction, challengeAction,
    } = useActions();
    const { screenSize } = useSelector((state) => state.size);
    const isMobile = screenIsMobile(screenSize);

    const canAfford = numCoins >= cost;
    const mustCoup = numCoins >= 10;
    const isDisabled = () => {
        if (!canAfford) {
            return true;
        }
        if (mustCoup && type !== actionTypes.COUP && !choiceIsBlock && !choiceIsRespond) {
            return true;
        }
        return false;
    };

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

        if (type === respondTypes.ALLOW) {
            acceptAction(actionId, actionIsBlock);
        } else if (type === respondTypes.CHALLENGE) {
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
                disabled={isDisabled()}
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
                disabled={isDisabled()}
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
