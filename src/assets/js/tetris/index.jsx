import React from 'react';
import { connect } from 'react-redux';

import AppActions from '../reducer/actions';
import reducer from './reducer';
import TetrisActions from './reducer/actions';
import Board from './board';
import Next from './next';

class Tetris extends React.Component {
    componentWillMount() {
        this.props.registerReducer();
        this.props.initializeBoard();
    }

    componentDidMount() {
        this.start();
    }

    start() {
        this.interval = setInterval(() => {
            this.props.boardNext();
        }, 500);
    }

    stop() {
        clearInterval(this.interval);
    }

    render() {
        return (
            <div>
                <Board board={this.props.board} flyingTetromino={this.props.flyingTetromino} />
                <Next nextTetromino={this.props.nextTetromino} />
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => state[ownProps.id] || {};

const mapDispatchToProps = (dispatch, ownProps) => ({
    registerReducer: () => {
        dispatch(AppActions.registerReducer(ownProps.id, reducer));
    },
    initializeBoard: () => {
        dispatch(AppActions.reduce(ownProps.id, TetrisActions.initializeBoard()));
    },
    boardNext: () => {
        dispatch(AppActions.reduce(ownProps.id, TetrisActions.boardNext()));
    },
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Tetris);
