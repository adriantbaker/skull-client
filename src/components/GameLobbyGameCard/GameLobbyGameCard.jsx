import React from 'react';
import { useDispatch } from 'react-redux';
import Button from '../../basicComponents/Button/Button';
import { joinGameRoom } from '../../store/game/gameActions';
import gamePropTypes from '../../utils/propTypes/gamePropTypes';

const GameLobbyGameCard = ({ game }) => {
    const { players, maxPlayers } = game;
    const numPlayers = players.length;

    const dispatch = useDispatch();

    return (
        <div className="max-w-md m-6 p-6 bg-gradient-to-b from-teal-100 to-teal-200 rounded-lg shadow-md">
            <div className="text-lg">{game.name}</div>
            <div>{`${numPlayers} / ${maxPlayers} players`}</div>
            <Button
                size="small"
                secondary
                label="Join Room"
                onClick={() => dispatch(joinGameRoom(game.id))}
            />
        </div>
    );
};

GameLobbyGameCard.propTypes = {
    game: gamePropTypes.isRequired,
};

export default GameLobbyGameCard;
