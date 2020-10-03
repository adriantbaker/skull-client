import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import socket from '../../utils/api/socket';

const useGame = () => {
    const { id: gameId } = useSelector((state) => state.game);
    const { id: playerId } = useSelector((state) => state.player);

    const [currentTurn, setCurrentTurn] = useState(-1);
    const [currentAction, setCurrentAction] = useState();
    const [currentBlock, setCurrentBlock] = useState();

    useEffect(() => {
        // Listen for all game updates
        socket.on('gameUpdate', (update) => {
            const {
                currentTurn: updatedTurn,
                currentAction: updatedAction,
                currentBlock: updatedBlock,
            } = update;
            if (updatedTurn !== null) setCurrentTurn(updatedTurn);
            if (updatedAction !== null) setCurrentAction(updatedAction);
            if (updatedBlock !== null) setCurrentBlock(updatedBlock);
        });
    }, []);

    const tryAction = (actionType, claimedCard = undefined, targetId = undefined) => {
        socket.emit('tryAction', {
            actionType,
            claimedCard,
            targetId,
            gameId,
            playerId,
        });
    };

    const challengeAction = (actionId, isBlock) => {
        socket.emit('challengeAction', {
            actionId,
            isBlock,
            gameId,
            playerId,
        });
    };

    const tryBlock = (actionId, actionType, claimedCard) => {
        socket.emit('tryBlock', {
            actionId,
            actionType,
            claimedCard,
            gameId,
            playerId,
        });
    };

    return {
        currentTurn,
        currentAction,
        currentBlock,
        tryAction,
        challengeAction,
        tryBlock,
    };
};

export default useGame;
