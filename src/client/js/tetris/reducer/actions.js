export const ActionTypes = {
    PLAYER_MOVE: 'PLAYER_MOVE',
    BOARD_NEXT: 'BOARD_NEXT',
    START_GAME: 'START_GAME',
    PAUSE_GAME: 'PAUSE_GAME',
    RESET_GAME: 'RESET_GAME',
};

const boardNext = () => ({
    type: ActionTypes.BOARD_NEXT,
});

const playerMove = move => ({
    type: ActionTypes.PLAYER_MOVE,
    move,
});

const startGame = () => ({
    type: ActionTypes.START_GAME,
});

const pauseGame = () => ({
    type: ActionTypes.PAUSE_GAME,
});

const resetGame = () => ({
    type: ActionTypes.RESET_GAME,
});

export default {
    boardNext,
    playerMove,
    startGame,
    pauseGame,
    resetGame,
};
