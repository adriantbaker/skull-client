import { combineReducers } from 'redux';

import gameReducer from '../game/gameReducer';
import playerReducer from '../player/playerReducer';
import sizeReducer from '../size/sizeReducer';
import userReducer from '../user/userReducer';

const rootReducer = combineReducers({
    game: gameReducer,
    player: playerReducer,
    size: sizeReducer,
    user: userReducer,
});

export default rootReducer;
