import Action from './action';
import Tetrominos from './tetrominos';


// Remote heading 0s and tailing 0s
const normalize = (tetromino, position) => {
    const normalizedTetromino = tetromino.map(row => row.slice());
    const normalizedPosition = position.slice();

    let topRemoved = 0;
    while (normalizedTetromino.length >= 0 && normalizedTetromino[0].every(square => !square)) {
        normalizedTetromino.shift();
        topRemoved++;
    }

    while (normalizedTetromino.length >= 0 && normalizedTetromino[normalizedTetromino.length - 1].every(square => !square)) {
        normalizedTetromino.pop();
    }

    let leftRemoved = 0;
    while (normalizedTetromino[0].length >= 0 && normalizedTetromino.every(row => !row[0])) {
        normalizedTetromino.forEach(row => row.shift());
        leftRemoved++;
    }

    while (normalizedTetromino[0].length >= 0 && normalizedTetromino.every(row => !row[row.length - 1])) {
        normalizedTetromino.forEach(row => row.pop());
    }

    normalizedPosition[0] += topRemoved;
    normalizedPosition[1] += leftRemoved;

    return {
        tetromino: normalizedTetromino,
        position: normalizedPosition,
    };
};

// Clockwise rotate
const rotate = (tetromino, position) => {
    const rotated = [];
    const rotatedPosition = position.slice();

    if (tetromino.length > tetromino[0].length) {
        const delta = tetromino.length - tetromino[0].length;
        const paddingLeft = Math.ceil(delta / 2);
        const paddingRight = delta - paddingLeft;

        tetromino = tetromino.map(row => [].concat(Array(paddingLeft).fill(0), row, Array(paddingRight).fill(0)));
        rotatedPosition[1] -= paddingLeft;
    } else if (tetromino.length < tetromino[0].length) {
        const delta = tetromino[0].length - tetromino.length;

        tetromino = [].concat(tetromino, Array(delta).fill(Array(tetromino[0].length).fill(0)));
    }

    tetromino.forEach((rows, i) => {
        rows.forEach((squre, j) => {
            const rotatedI = j;
            const rotatedJ = tetromino.length - 1 - i;

            rotated[rotatedI] = rotated[rotatedI] || [];
            rotated[rotatedI][rotatedJ] = squre;
        });
    });

    return normalize(rotated, rotatedPosition);
};

const canMoveTo = (board, tetromino, position) => !tetromino.some((row, i) => row.some((square, j) => {
    if (!square) {
        return false;
    }

    const movedI = i + position[0];
    const movedJ = j + position[1];

    if (movedI < 0 || movedI >= board.length || movedJ < 0 || movedJ >= board[0].length) {
        return true;
    }

    return !!board[movedI][movedJ];
}));

const eliminate = (board) => {
    const rowSize = board[0].length;
    const eliminatedRows = [];
    const eliminatedBoard = board.filter((row, i) => {
        if (row.every(square => !!square)) {
            eliminatedRows.push(i);
            return false;
        }

        return true;
    });

    eliminatedRows.forEach(() => {
        eliminatedBoard.unshift(Array(rowSize).fill(0));
    });

    return {
        rows: eliminatedRows,
        board: eliminatedBoard,
    };
};

const persist = (board, tetromino, position) => {
    const persistedBoard = board.map(row => row.slice());

    tetromino.forEach((row, i) => {
        row.forEach((square, j) => {
            if (!square) {
                return;
            }

            const persistedI = i + position[0];
            const persistedJ = j + position[1];

            if (persistedI < 0 || persistedI >= board.length || persistedJ < 0 || persistedJ >= board[0].length) {
                return;
            }

            persistedBoard[persistedI][persistedJ] = square;
        });
    });

    return persistedBoard;
};

const move = (option) => {
    // TODO: Validate input
    // { board, tetromino, position, action }
    const { board, action } = option;
    let { position, tetromino } = option;
    position = position.slice();

    switch (action) {
        case Action.ROTATE:
            const rotateResult = rotate(tetromino, position);
            ({ tetromino, position } = rotateResult);
            break;
        case Action.MOVE_LEFT:
            position[1] -= 1;
            break;
        case Action.MOVE_RIGHT:
            position[1] += 1;
            break;
        case Action.MOVE_DOWN:
            position[0] += 1;
            break;
        case Action.DROP:
            let result = { success: false };
            let nextResult;

            do {
                nextResult = move({
                    board,
                    tetromino,
                    position: result.position || position,
                    action: Action.MOVE_DOWN,
                });
            } while (nextResult.success && (result = nextResult));

            return result;
        default:
            return { success: false };
    }

    if (!canMoveTo(board, tetromino, position)) {
        return { success: false };
    }

    return {
        success: true,
        tetromino,
        position,
    };
};

export default {
    rotate,
    normalize,
    canMoveTo,
    move,
    eliminate,
    persist,
    Action,
    Tetrominos,
};
