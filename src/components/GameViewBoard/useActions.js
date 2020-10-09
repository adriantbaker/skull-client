import { useSelector } from 'react-redux';
import socket from '../../utils/api/socket';

const useActions = () => {
    const { id: gameId } = useSelector((state) => state.game);
    const { id: playerId } = useSelector((state) => state.player);

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

    const acceptAction = (actionId, isBlock) => {
        socket.emit('acceptAction', {
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

    const discard = (cardIds) => {
        socket.emit('discard', {
            cardIds,
            gameId,
            playerId,
        });
    };

    return {
        tryAction,
        challengeAction,
        acceptAction,
        tryBlock,
        discard,
    };
};

export default useActions;
