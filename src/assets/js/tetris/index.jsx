import React from 'react';
import { connect } from 'react-redux';
import injectSheet from 'react-jss';

import AppActions from '../reducer/actions';
import reducer from './reducer';
import TetrisActions from './reducer/actions';
import Board from './board';
import Next from './next';

const styles = {
    tetris: {
        position: 'relative',
        height: 400,
        width: '100%',
        padding: 20,
        overflow: 'scroll',
    },
    board: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: 200,
        height: 400,
    },
    next: {
        position: 'absolute',
        top: 40,
        left: 240,
        width: 80,
        height: 80,
    },
};

class Tetris extends React.Component {
    componentWillMount() {
        this.props.registerReducer();
        this.props.resetGame();
    }

    componentDidMount() {
        this.props.startGame();
    }

    render() {
        return (
            <div className={this.props.classes.tetris}>
                <div className={this.props.classes.board}>
                    <Board board={this.props.board} flyingTetromino={this.props.flyingTetromino} />
                </div>
                <div className={this.props.classes.next}>
                    <Next nextTetromino={this.props.nextTetromino} />
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => state[ownProps.id] || {};

const mapDispatchToProps = (dispatch, ownProps) => ({
    registerReducer: () => {
        dispatch(AppActions.registerReducer(ownProps.id, reducer));
    },
    resetGame: () => {
        dispatch(AppActions.reduce(ownProps.id, TetrisActions.resetGame()));
    },
    startGame: () => {
        dispatch(AppActions.reduce(ownProps.id, TetrisActions.startGame()));
    },
    pauseGame: () => {
        dispatch(AppActions.reduce(ownProps.id, TetrisActions.pauseGame()));
    },
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(injectSheet(styles)(Tetris));
