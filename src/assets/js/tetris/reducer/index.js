import TetrisCore from '../../../../server/tetris/core';
import Config from '../config';

const ActionTypes = {
    PLAYER_MOVE: 'PLAYER_MOVE',
    BOARD_NEXT: 'BOARD_NEXT',
    BOARD_INITIALIZE: 'BOARD_INITIALIZE',
};

const generateTetromino = () => {
    const tetrominos = TetrisCore.Tetrominos;
    const keys = Object.keys(tetrominos);
    const tetromino = tetrominos[keys[Math.floor(keys.length * Math.random())]];

    const position = [
        Config.INVISIBLE_ROW_NUMBER - tetromino.length,
        Math.ceil((Config.COL_NUM - tetromino[0].length) / 2),
    ];

    return {
        tetromino,
        position,
    };
};

const createBoard = () => Array(Config.ROW_NUM).fill(Array(Config.COL_NUM).fill(0));

const isGameOver = (board) => {
    for (let i = 0; i < Config.INVISIBLE_ROW_NUMBER; i++) {
        for (let j = 0; j < Config.COL_NUM; j++) {
            if (board[i][j]) {
                return true;
            }
        }
    }

    return false;
};

export default (state = {}, action) => {
    const { type } = action;
    const {
        board, flyingTetromino, nextTetromino, gameOver,
    } = state;

    if (gameOver) {
        return state;
    }

    switch (type) {
        case ActionTypes.BOARD_INITIALIZE:
            return { board: createBoard(), nextTetromino: generateTetromino() };
        case ActionTypes.BOARD_NEXT:
            if (!flyingTetromino) {
                return Object.assign({}, state, { flyingTetromino: nextTetromino, nextTetromino: generateTetromino() });
            }

            // Try moving down first
            const moveDownResult = TetrisCore.move({
                board: state.board,
                tetromino: flyingTetromino.tetromino,
                position: flyingTetromino.position,
                action: TetrisCore.Action.MOVE_DOWN,
            });

            if (moveDownResult.success) {
                const updatedFlyingTetromino = { tetromino: moveDownResult.tetromino, position: moveDownResult.position };
                return Object.assign({}, state, { flyingTetromino: updatedFlyingTetromino });
            }

            // If it doesn't succeed, it means the flyingTetromino reached the bottom
            const persistedBoard = TetrisCore.persist(board, flyingTetromino.tetromino, flyingTetromino.position);
            const eliminatedResult = TetrisCore.eliminate(persistedBoard);
            const eliminatedBoard = eliminatedResult.board;
            const gameOver = isGameOver(eliminatedBoard);

            return Object.assign({}, state, {
                nextTetromino: gameOver ? undefined : generateTetromino(),
                flyingTetromino: gameOver ? undefined : nextTetromino,
                board: eliminatedBoard,
                eliminatedRows: eliminatedResult.rows,
                persistedBoard,
                gameOver,
            });

        case ActionTypes.PLAYER_MOVE:
            const moveResult = TetrisCore.move({
                board: state.board,
                tetromino: flyingTetromino.tetromino,
                position: flyingTetromino.position,
                action: action.move,
            });

            if (moveResult.success) {
                const updatedFlyingTetromino = { tetromino: moveResult.tetromino, position: moveResult.position };
                return Object.assign({}, state, { flyingTetromino: updatedFlyingTetromino });
            }

            return state;

        default:
            return state;
    }
};
