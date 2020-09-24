import { combineReducers } from 'redux';

import gameReducer from '../game/gameReducer';
import userReducer from '../user/userReducer';

const rootReducer = combineReducers({
    game: gameReducer,
    user: userReducer,
});

export default rootReducer;
