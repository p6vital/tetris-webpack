import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Config from './config';

const styles = theme => ({
    board: {
        position: 'relative',
        height: Config.SQARE_SIZE * Config.ROW_NUM,
        width: Config.SQARE_SIZE * Config.COL_NUM,
        left: '50%',
        marginLeft: -(Config.SQARE_SIZE * Config.COL_NUM) / 2,
    },
    square: {
        position: 'absolute',
        height: Config.SQARE_SIZE,
        width: Config.SQARE_SIZE,
        backgroundColor: theme.palette.primary[200],
        border: 'solid 1px #FFFFFF',
    },
    blackSquare: {
        backgroundColor: '#000',
    },
});

const Board = ({ board, flyingTetromino, classes }) => {
    if (!board) {
        return (<div />);
    }

    const gridDom = board.map((row, i) => row.map((square, j) => {
        let additionalClass;
        if (flyingTetromino) {
            const { position, tetromino } = flyingTetromino;
            const x = i - position[0];
            const y = j - position[1];
            if (x >= 0 && x < tetromino.length && y >= 0 && tetromino[x][y]) {
                additionalClass = classes.blackSquare;
            }
        }

        if (board[i][j]) {
            additionalClass = classes.blackSquare;
        }

        return (
            <div
                key={`square-${i}-${j}`}
                className={`${classes.square} ${additionalClass || ''}`}
                style={{
                    top: Config.SQARE_SIZE * i,
                    left: Config.SQARE_SIZE * j,
                }}
            />
        );
    }));

    return (
        <div className={classes.board}>
            {gridDom}
        </div>
    );
};

Board.propTypes = {
    classes: PropTypes.object.isRequired,
    board: PropTypes.arrayOf(PropTypes.array),
    flyingTetromino: PropTypes.object,
};

Board.defaultProps = {
    board: undefined,
    flyingTetromino: undefined,
};


export default withStyles(styles)(Board);
