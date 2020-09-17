import React from 'react';

const GameLobbyGameCard = (props: any) => {
    const { game } = props;

    return (
        <div style={{ border: '2px solid black', width: 200 }}>
            <div>Game Card</div>
            <div>{game.name}</div>
        </div>
    );
};

export default GameLobbyGameCard;
