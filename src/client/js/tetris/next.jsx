import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Config from './config';

const styles = () => ({
    square: {
        position: 'absolute',
        height: Config.SQARE_SIZE,
        width: Config.SQARE_SIZE,
        backgroundColor: 'transparent',
        border: 'solid 1px transparent',
    },
    blackSquare: {
        backgroundColor: '#000',
        border: 'solid 1px #FFFFFF',
    },
    next: {
        position: 'relative',
    },
});

const Next = ({ nextTetromino, classes }) => {
    if (!nextTetromino) {
        return (<div />);
    }

    const { tetromino } = nextTetromino;

    if (!tetromino) {
        return (<div />);
    }

    const gridDom = tetromino.map((row, i) => row.map((square, j) => (
        <div
            key={`square-${i}-${j}`}
            className={`${classes.square} ${tetromino[i][j] ? classes.blackSquare : ''}`}
            style={{
                top: Config.SQARE_SIZE * i,
                left: Config.SQARE_SIZE * j,
            }}
        />
    )));

    return (
        <div
            className={classes.next}
            style={{
                height: `${Config.SQARE_SIZE * tetromino.length}px`,
                width: `${Config.SQARE_SIZE * tetromino[0].length}px`,
            }}
        >
            {gridDom}
        </div>
    );
};

Next.propTypes = {
    nextTetromino: PropTypes.object,
    classes: PropTypes.object.isRequired,
};

Next.defaultProps = {
    nextTetromino: undefined,
};

export default withStyles(styles)(Next);
