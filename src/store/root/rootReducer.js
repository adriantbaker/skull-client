import { combineReducers } from 'redux';

import gameReducer from '../game/gameReducer';
import sizeReducer from '../size/sizeReducer';
import userReducer from '../user/userReducer';

const rootReducer = combineReducers({
    game: gameReducer,
    size: sizeReducer,
    user: userReducer,
});

export default rootReducer;
