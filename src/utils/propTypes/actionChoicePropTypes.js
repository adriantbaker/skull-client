import PropTypes from 'prop-types';
import { cardTypePropTypes } from './cardPropTypes';
import { actionTypesArray, actionTypePropTypes } from './gameActionPropTypes';

const actionChoiceShape = {
    type: actionTypePropTypes.isRequired,
    claimedCard: cardTypePropTypes,
    cost: PropTypes.number,
    chooseTarget: PropTypes.bool,
    isBlock: PropTypes.bool,
    after: PropTypes.oneOf(actionTypesArray),
};

const actionChoicePropTypes = PropTypes.shape(actionChoiceShape);

export default actionChoicePropTypes;
