import { RESIZE } from './sizeTypes';

const initialState = {
    screenSize: 'xs',
};

export default function sizeReducer(state = initialState, action) {
    switch (action.type) {
        case RESIZE:
            return {
                ...state,
                screenSize: action.screenSize,
            };
        default:
            return state;
    }
}
