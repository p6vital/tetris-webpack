import assert from 'assert';

import Core from '../../../src/server/tetris/core';

describe('Normalize', () => {
    it('Normalize', () => {
        const input = [
            [0, 0, 0, 0],
            [0, 1, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
        ];

        const expected = [
            [1],
        ];

        const output = Core.normalize(input, [0, 0]);

        assert.deepEqual(output.tetromino, expected);
        assert.deepEqual(output.position, [1, 1]);
    });
});

describe('Clockwise Rotate', () => {
    it('T shape', () => {
        const input = [
            [0, 1, 0],
            [1, 1, 1],
        ];

        const expected = [
            [1, 0],
            [1, 1],
            [1, 0],
        ];

        const output = Core.rotate(input, [0, 0]);

        assert.deepEqual(output.tetromino, expected);
        assert.deepEqual(output.position, [0, 1]);
    });

    it('L shape', () => {
        const input = [
            [1, 0, 0],
            [1, 1, 1],
        ];

        const expected = [
            [1, 1],
            [1, 0],
            [1, 0],
        ];

        const output = Core.rotate(input, [0, 0]);

        assert.deepEqual(output.tetromino, expected);
        assert.deepEqual(output.position, [0, 1]);
    });

    it('O shape', () => {
        const input = [
            [1, 1],
            [1, 1],
        ];

        const expected = [
            [1, 1],
            [1, 1],
        ];

        const output = Core.rotate(input, [0, 0]);

        assert.deepEqual(output.tetromino, expected);
        assert.deepEqual(output.position, [0, 0]);
    });

    it('I shape', () => {
        const input = [
            [1],
            [1],
            [1],
            [1],
        ];

        const expected = [
            [1, 1, 1, 1],
        ];

        const output = Core.rotate(input, [0, 2]);

        assert.deepEqual(output.tetromino, expected);
        assert.deepEqual(output.position, [2, 0]);
    });

    it('Z shape', () => {
        const input = [
            [1, 1, 0],
            [0, 1, 1],
        ];

        const expected = [
            [0, 1],
            [1, 1],
            [1, 0],
        ];

        const output = Core.rotate(input, [0, 0]);

        assert.deepEqual(output.tetromino, expected);
        assert.deepEqual(output.position, [0, 1]);
    });
});

describe('Can Move To?', () => {
    it('Yes', () => {
        const board = [
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [1, 0, 0, 0, 0],
            [1, 1, 0, 0, 0],
            [1, 1, 1, 0, 0],
        ];

        const tetromino = [
            [1, 0, 0],
            [1, 1, 0],
            [0, 1, 0],
        ];

        const position = [1, 1];

        const output = Core.canMoveTo(board, tetromino, position);

        assert(output);
    });

    it('Yes 2', () => {
        const board = [
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [1, 0, 0, 0, 0],
            [1, 1, 0, 0, 0],
            [1, 1, 1, 0, 0],
        ];

        const tetromino = [
            [1, 0, 0],
            [1, 1, 0],
            [0, 1, 0],
        ];

        const position = [0, 3];

        const output = Core.canMoveTo(board, tetromino, position);

        assert(output);
    });

    it('Yes 3', () => {
        const board = [
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [1, 0, 0, 0, 0],
            [1, 1, 0, 0, 0],
            [1, 1, 1, 0, 0],
        ];

        const tetromino = [
            [0, 1, 0],
            [0, 1, 1],
            [0, 0, 1],
        ];

        const position = [0, -1];

        const output = Core.canMoveTo(board, tetromino, position);

        assert(output);
    });

    it('No (Crash)', () => {
        const board = [
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [1, 0, 0, 0, 0],
            [1, 1, 0, 0, 0],
            [1, 1, 1, 0, 0],
        ];

        const tetromino = [
            [0, 1, 0],
            [0, 1, 0],
            [0, 1, 1],
        ];

        const position = [1, 0];

        const output = Core.canMoveTo(board, tetromino, position);

        assert(!output);
    });

    it('No (Out of bound)', () => {
        const board = [
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [1, 0, 0, 0, 0],
            [1, 1, 0, 0, 0],
            [1, 1, 1, 0, 0],
        ];

        const tetromino = [
            [0, 1, 0],
            [0, 1, 0],
            [0, 1, 1],
        ];

        const position = [0, 3];

        const output = Core.canMoveTo(board, tetromino, position);

        assert(!output);
    });
});

describe('Move', () => {
    it('Rotate Succeeded', () => {
        const board = [
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [1, 0, 0, 0, 0],
            [1, 1, 0, 0, 0],
            [1, 1, 1, 0, 0],
        ];

        const tetromino = [
            [1, 0],
            [1, 0],
            [1, 1],
        ];

        const position = [0, 2];

        const action = Core.Action.ROTATE;

        const output = Core.move({
            board,
            tetromino,
            position,
            action,
        });

        assert(output.success);
        assert.deepEqual(output.position, [1, 1]);
    });

    it('Rotate Failed', () => {
        const board = [
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [1, 0, 0, 0, 0],
            [1, 1, 0, 0, 0],
            [1, 1, 1, 0, 0],
        ];

        const tetromino = [
            [1, 0],
            [1, 0],
            [1, 1],
        ];

        const position = [0, 1];

        const action = Core.Action.ROTATE;

        const output = Core.move({
            board,
            tetromino,
            position,
            action,
        });

        assert(!output.success);
    });

    it('Move Left Succeeded', () => {
        const board = [
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [1, 0, 0, 0, 0],
            [1, 1, 0, 0, 0],
            [1, 1, 1, 0, 0],
        ];

        const tetromino = [
            [1, 0],
            [1, 0],
            [1, 1],
        ];

        const position = [0, 2];

        const action = Core.Action.MOVE_LEFT;

        const output = Core.move({
            board,
            tetromino,
            position,
            action,
        });

        assert(output.success);
        assert.deepEqual(output.tetromino, tetromino);
        assert.deepEqual(output.position, [0, 1]);
    });

    it('Move Left Failed', () => {
        const board = [
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [1, 0, 0, 0, 0],
            [1, 1, 0, 0, 0],
            [1, 1, 1, 0, 0],
        ];

        const tetromino = [
            [1, 0],
            [1, 0],
            [1, 1],
        ];

        const position = [0, 1];

        const action = Core.Action.MOVE_LEFT;

        const output = Core.move({
            board,
            tetromino,
            position,
            action,
        });

        assert(!output.success);
    });

    it('Move Right Succeeded', () => {
        const board = [
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [1, 0, 0, 0, 0],
            [1, 1, 0, 0, 0],
            [1, 1, 1, 0, 0],
        ];

        const tetromino = [
            [1, 0],
            [1, 0],
            [1, 1],
        ];

        const position = [0, 2];

        const action = Core.Action.MOVE_RIGHT;

        const output = Core.move({
            board,
            tetromino,
            position,
            action,
        });

        assert(output.success);
        assert.deepEqual(output.tetromino, tetromino);
        assert.deepEqual(output.position, [0, 3]);
    });

    it('Move Right Failed', () => {
        const board = [
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [1, 0, 0, 0, 0],
            [1, 1, 0, 0, 0],
            [1, 1, 1, 0, 0],
        ];

        const tetromino = [
            [1, 0],
            [1, 0],
            [1, 1],
        ];

        const position = [0, 3];

        const action = Core.Action.MOVE_RIGHT;

        const output = Core.move({
            board,
            tetromino,
            position,
            action,
        });

        assert(!output.success);
    });

    it('Move Down Succeeded', () => {
        const board = [
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [1, 0, 0, 0, 0],
            [1, 1, 0, 0, 0],
            [1, 1, 1, 0, 0],
        ];

        const tetromino = [
            [1, 0],
            [1, 0],
            [1, 1],
        ];

        const position = [0, 2];

        const action = Core.Action.MOVE_DOWN;

        const output = Core.move({
            board,
            tetromino,
            position,
            action,
        });

        assert(output.success);
        assert.deepEqual(output.tetromino, tetromino);
        assert.deepEqual(output.position, [1, 2]);
    });

    it('Move Down Failed', () => {
        const board = [
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [1, 0, 0, 0, 0],
            [1, 1, 0, 0, 0],
            [1, 1, 1, 0, 0],
        ];

        const tetromino = [
            [1, 0],
            [1, 0],
            [1, 1],
        ];

        const position = [0, 1];

        const action = Core.Action.MOVE_DOWN;

        const output = Core.move({
            board,
            tetromino,
            position,
            action,
        });

        assert(!output.success);
    });

    it('Drop Succeeded', () => {
        const board = [
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [1, 0, 0, 0, 0],
            [1, 1, 0, 0, 0],
            [1, 1, 1, 0, 0],
        ];

        const tetromino = [
            [1, 1, 1],
            [0, 1, 0],
        ];

        const position = [0, 2];

        const action = Core.Action.DROP;

        const output = Core.move({
            board,
            tetromino,
            position,
            action,
        });

        assert(output.success);
        assert.deepEqual(output.tetromino, tetromino);
        assert.deepEqual(output.position, [3, 2]);
    });

    it('Move Down Failed', () => {
        const board = [
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [1, 0, 0, 0, 0],
            [1, 1, 0, 0, 0],
            [1, 1, 1, 0, 0],
        ];

        const tetromino = [
            [1, 0],
            [1, 0],
            [1, 1],
        ];

        const position = [2, 2];

        const action = Core.Action.DROP;

        const output = Core.move({
            board,
            tetromino,
            position,
            action,
        });

        assert(!output.success);
    });
});

describe('Eliminate', () => {
    it('No Full Row', () => {
        const board = [
            [0, 0, 0, 0, 0],
            [1, 1, 0, 0, 0],
            [1, 0, 0, 0, 0],
            [1, 1, 0, 0, 0],
            [1, 1, 1, 1, 0],
        ];

        const output = Core.eliminate(board);

        assert.deepEqual(output.rows, []);
        assert.deepEqual(output.board, board);
    });

    it('Single Full Row', () => {
        const board = [
            [0, 0, 0, 0, 0],
            [1, 1, 0, 0, 0],
            [1, 0, 0, 0, 0],
            [1, 1, 0, 0, 0],
            [1, 1, 1, 1, 1],
        ];

        const eliminatedBoard = [
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [1, 1, 0, 0, 0],
            [1, 0, 0, 0, 0],
            [1, 1, 0, 0, 0],
        ];

        const output = Core.eliminate(board);

        assert.deepEqual(output.rows, [4]);
        assert.deepEqual(output.board, eliminatedBoard);
    });

    it('Multiple Full Rows', () => {
        const board = [
            [0, 0, 0, 0, 0],
            [1, 1, 0, 0, 0],
            [1, 1, 1, 1, 1],
            [1, 1, 0, 0, 0],
            [1, 1, 1, 1, 1],
        ];

        const eliminatedBoard = [
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [1, 1, 0, 0, 0],
            [1, 1, 0, 0, 0],
        ];

        const output = Core.eliminate(board);

        assert.deepEqual(output.rows, [2, 4]);
        assert.deepEqual(output.board, eliminatedBoard);
    });
});

describe('Persist', () => {
    it('No Crash', () => {
        const board = [
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [1, 0, 0, 0, 0],
            [1, 1, 0, 0, 0],
            [1, 1, 1, 0, 0],
        ];

        const tetromino = [
            [0, 2, 0],
            [0, 2, 0],
            [0, 2, 2],
        ];

        const position = [2, 2];

        const expected = [
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [1, 0, 0, 2, 0],
            [1, 1, 0, 2, 0],
            [1, 1, 1, 2, 2],
        ];

        const output = Core.persist(board, tetromino, position);

        assert.deepEqual(output, expected);
    });

    it('Has Crash (Invalid use case)', () => {
        const board = [
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [1, 0, 0, 0, 0],
            [1, 1, 0, 0, 0],
            [1, 1, 1, 0, 0],
        ];

        const tetromino = [
            [0, 2, 0, 0],
            [0, 2, 0, 0],
            [2, 2, 2, 2],
        ];

        const position = [2, 2];

        const expected = [
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [1, 0, 0, 2, 0],
            [1, 1, 0, 2, 0],
            [1, 1, 2, 2, 2],
        ];

        const output = Core.persist(board, tetromino, position);

        assert.deepEqual(output, expected);
    });
});
