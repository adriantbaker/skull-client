import { cardTypes } from '../propTypes/cardPropTypes';

const getCardColorClassName = (cardType, isDead, isOpponentView) => {
    let className = 'bg-gradient-to-br ';
    let whiteText = true;

    switch (cardType) {
        case cardTypes.AMBASSADOR:
            className += 'from-teal-500 to-teal-600';
            break;
        case cardTypes.ASSASSIN:
            className += 'from-blue-700 to-blue-800';
            break;
        case cardTypes.CAPTAIN:
            className += 'from-red-500 to-red-600';
            break;
        case cardTypes.CONTESSA:
            className += 'from-pink-600 to-pink-700';
            break;
        case cardTypes.DUKE:
            className += 'from-green-500 to-green-600';
            break;
        default:
            className += 'from-gray-200 to-gray-300';
            whiteText = false;
            break;
    }

    if (whiteText) {
        className += ' text-white';
    }

    if (isDead) {
        className += isOpponentView ? ' opacity-75' : ' opacity-25';
    }

    return className;
};

export default getCardColorClassName;
