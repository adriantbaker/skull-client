import { cardTypes } from '../propTypes/cardPropTypes';

const getSkullColorClassName = (cardType) => {
    switch (cardType) {
        case cardTypes.AMBASSADOR:
            return 'text-teal-600';
        case cardTypes.ASSASSIN:
            return 'text-blue-800';
        case cardTypes.CAPTAIN:
            return 'text-red-600';
        case cardTypes.CONTESSA:
            return 'text-pink-700';
        case cardTypes.DUKE:
            return 'text-green-600';
        default:
            return '';
    }
};

export default getSkullColorClassName;
