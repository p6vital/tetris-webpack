import AppActions from '../../reducer/actions';
import { getStore } from '../../reducer';

import TetrisCore from '../../../../server/tetris/core';
import Config from '../config';

import TetrisActions, { ActionTypes } from './actions';
import Scheduler from './scheduler';

export const GameStates = {
    NOT_STARTED: 'NOT_STARTED',
    STARTED: 'STARTED',
    PAUSED: 'PAUSED',
    GAME_OVER: 'GAME_OVER',
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

const handleGameState = (state = {}, action, componentId) => {
    const { type } = action;
    const { gameState } = state;

    switch (type) {
        case ActionTypes.RESET_GAME:
            state.scheduler && state.scheduler.stop();
            const store = getStore();

            return {
                board: createBoard(),
                nextTetromino: generateTetromino(),
                gameState: GameStates.NOT_STARTED,
                scheduler: new Scheduler(() => {
                    store.dispatch(AppActions.reduce(componentId, TetrisActions.boardNext()));
                }),
            };

        case ActionTypes.START_GAME:
            state.scheduler.start();
            return Object.assign({}, state, { gameState: GameStates.STARTED });

        case ActionTypes.PAUSE_GAME:
            state.scheduler.stop();
            return Object.assign({}, state, { gameState: GameStates.PAUSED });

        default:
            return state;
    }
};

const handleBoardNext = (state = {}, action) => {
    const { type } = action;
    const {
        board, flyingTetromino, nextTetromino,
    } = state;

    if (type !== ActionTypes.BOARD_NEXT) {
        return state;
    }

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
    const gameState = gameOver ? GameStates.GAME_OVER : state.gameState;

    return Object.assign({}, state, {
        nextTetromino: gameOver ? undefined : generateTetromino(),
        flyingTetromino: gameOver ? undefined : nextTetromino,
        board: eliminatedBoard,
        eliminatedRows: eliminatedResult.rows,
        persistedBoard,
        gameState,
    });
};

const handlePlayerMove = (state = {}, action) => {
    const { type } = action;
    const { flyingTetromino } = state;

    if (type !== ActionTypes.PLAYER_MOVE || !flyingTetromino) {
        return state;
    }

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
};

export default (state = {}, action, componentId) => {
    const { type } = action;
    const { gameState } = state;

    if (gameState === GameStates.GAME_OVER && type !== ActionTypes.RESET_GAME) {
        return state;
    }

    let updatedState = Object.assign({}, state);

    updatedState = handleGameState(updatedState, action, componentId);
    updatedState = handleBoardNext(updatedState, action);

    if (gameState === GameStates.STARTED) {
        updatedState = handlePlayerMove(updatedState, action);
    }

    return updatedState;
};
