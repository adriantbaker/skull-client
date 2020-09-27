import { combineReducers } from 'redux';

import gameReducer from '../game/gameReducer';
import playerReducer from '../player/playerReducer';
import userReducer from '../user/userReducer';

const rootReducer = combineReducers({
    game: gameReducer,
    player: playerReducer,
    user: userReducer,
});

export default rootReducer;
