import React from 'react';
import {
    RiCoinFill as OneCoin,
    RiHandCoinFill as TakeCoins,
} from 'react-icons/ri';
import {
    GiTwoCoins as TwoCoins,
    GiBroadsword as Sword,
} from 'react-icons/gi';
import {
    FaCoins as ManyCoins,
    FaSkullCrossbones as Skull,
} from 'react-icons/fa';
import { MdSwapVert as Swap } from 'react-icons/md';
import { actionTypes } from '../propTypes/gameActionPropTypes';

const formatActionIcon = (actionType, className = '') => {
    switch (actionType) {
        case actionTypes.INCOME:
            return <OneCoin className={className} />;
        case actionTypes.FOREIGN_AID:
            return <TwoCoins className={className} />;
        case actionTypes.COUP:
            return <Skull className={className} />;
        case actionTypes.TAX:
            return <ManyCoins className={className} />;
        case actionTypes.ASSASSINATE:
            return <Sword className={className} />;
        case actionTypes.STEAL:
            return <TakeCoins className={className} />;
        case actionTypes.EXCHANGE:
            return <Swap className={className} />;
        default:
            return null;
    }
};

export default formatActionIcon;
