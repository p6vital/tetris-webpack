export const ActionTypes = {
    PLAYER_MOVE: 'PLAYER_MOVE',
    BOARD_NEXT: 'BOARD_NEXT',
    BOARD_INITIALIZE: 'BOARD_INITIALIZE',
};

const initializeBoard = () => ({
    type: ActionTypes.BOARD_INITIALIZE,
});

const boardNext = () => ({
    type: ActionTypes.BOARD_NEXT,
});

const playerMove = move => ({
    type: ActionTypes.PLAYER_MOVE,
    move,
});

export default {
    initializeBoard,
    boardNext,
    playerMove,
};
