import React from 'react';
import PropTypes from 'prop-types';
import actionChoicePropTypes from '../../utils/propTypes/actionChoicePropTypes';
import Button from '../../basicComponents/Button/Button';
import formatActionType from '../../utils/formatting/formatActionType';
import useActions from '../GameViewBoard/useActions';

const GameViewActionChooseButton = (props) => {
    const {
        choice, actionId, actionIsBlock, numCoins, setMustChooseTarget, setPendingChoice,
    } = props;
    const {
        type, isBlock: choiceIsBlock, claimedCard, cost = 0, chooseTarget = false,
    } = choice;

    const {
        tryAction, tryBlock, acceptAction, challengeAction,
    } = useActions();

    const canAfford = numCoins >= cost;

    const handleClick = () => {
        if (chooseTarget) {
            setMustChooseTarget(true);
            setPendingChoice(choice);
        } else if (type === 'allow') {
            acceptAction(actionId, actionIsBlock);
        } else if (type === 'challenge') {
            challengeAction(actionId, actionIsBlock);
        } else if (choiceIsBlock) {
            tryBlock(actionId, type, claimedCard);
        } else {
            tryAction(type, claimedCard);
        }
    };

    return (
        <div>
            <Button
                label={formatActionType(type)}
                onClick={handleClick}
                disabled={!canAfford}
            />
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
};

GameViewActionChooseButton.defaultProps = {
    actionId: undefined,
    actionIsBlock: false,
};

export default GameViewActionChooseButton;
