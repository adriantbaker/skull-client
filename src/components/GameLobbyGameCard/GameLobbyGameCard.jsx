import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { joinGame } from '../../store/game/gameActions';

const GameLobbyGameCard = (props) => {
    const { game } = props;
    const username = useSelector((state) => state.user.username);
    const dispatch = useDispatch();

    return (
        <div className="max-w-md m-6 p-6 bg-teal-100 rounded-lg shadow-md">
            <div className="text-lg">{game.name}</div>
            <div>
                {game.players.length}
                {' '}
                / 5 people
            </div>
            <button
                type="button"
                onClick={() => dispatch(joinGame(game, username))}
            >
                Join Game
            </button>
        </div>
    );
};

export default GameLobbyGameCard;
