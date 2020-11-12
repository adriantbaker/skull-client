import React from 'react';
import PropTypes from 'prop-types';
import GameLobbyGameCard from '../GameLobbyGameCard/GameLobbyGameCard';
import gamePropTypes from '../../utils/propTypes/gamePropTypes';

const GameLobbyGameCards = (props) => {
    const { games } = props;

    if (games.length === 0) {
        return (
            <div className="m-6">
                No games found.
            </div>
        );
    }

    return (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3">
            {games.map((game) => (
                <GameLobbyGameCard
                    key={game.id}
                    game={game}
                />
            ))}
        </div>
    );
};

GameLobbyGameCards.propTypes = {
    games: PropTypes.arrayOf(gamePropTypes).isRequired,
};

export default GameLobbyGameCards;
