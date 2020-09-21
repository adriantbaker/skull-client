import React from 'react';

const GameLobbyGameCard = (props: any) => {
    const { game } = props;

    return (
        <div className="max-w-md m-6 p-6 bg-teal-100 rounded-lg shadow-md">
            <div className="text-lg">{game.name}</div>
            <div>1 / 5 people</div>
        </div>
    );
};

export default GameLobbyGameCard;
