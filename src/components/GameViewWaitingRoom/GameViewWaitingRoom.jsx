import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import socket from '../../utils/api/socket';
import Button from '../../basicComponents/Button/Button';
import { startGame } from '../../store/game/gameActions';
import useRoom from './useRoom';
import Header from '../../basicComponents/Header/Header';
import Card from '../../basicComponents/Card/Card';

const GameViewWaitingRoom = (props) => {
    const { leaveButton } = props;

    const dispatch = useDispatch();

    const { game } = useRoom();
    const {
        name, players, ownGame, id: roomId,
    } = game;
    const numPlayers = players.length;

    const { id: playerId } = useSelector((state) => state.user);

    const [thisPlayer] = players.filter((player) => player.id === playerId);
    const { ready } = thisPlayer;

    const toggleReady = () => {
        socket.emit('toggleReady', { roomId, playerId });
    };

    const getStartGameButton = () => {
        if (!ownGame) {
            return (
                <Button
                    secondary
                    onClick={toggleReady}
                >
                    {ready ? "I'm Not Ready" : "I'm Ready"}
                </Button>
            );
        }

        const allReady = players
            .filter((player) => player.id !== playerId)
            .every((player) => player.ready);

        return (
            <Button
                disabled={numPlayers < 2 || !allReady}
                onClick={() => dispatch(startGame(roomId))}
            >
                START GAME
            </Button>
        );
    };

    const getPlayerIcon = (player) => {
        if (player.isOwner) {
            return 'Owner';
        }
        if (player.ready) {
            return 'Ready';
        }
        return 'Not Ready';
    };

    return (
        <div>
            <Header
                h="2"
                className="text-white py-6"
            >
                Waiting Room
            </Header>
            <div className="flex justify-center">
                <Card
                    className="m-6 p-6 w-full md:w-2/3 space-y-4"
                >
                    <Header>{name}</Header>
                    <div>
                        <div>{`${numPlayers} player${numPlayers === 1 ? '' : 's'}:`}</div>
                        {players.map((player) => (
                            <div>
                                {player.name}
                                {' '}
                                -
                                {' '}
                                {getPlayerIcon(player)}
                            </div>
                        ))}
                    </div>
                    <div className="space-x-4">
                        {getStartGameButton()}
                        {leaveButton}
                    </div>
                </Card>
            </div>
        </div>
    );
};

GameViewWaitingRoom.propTypes = {
    leaveButton: PropTypes.node.isRequired,
};

export default GameViewWaitingRoom;
