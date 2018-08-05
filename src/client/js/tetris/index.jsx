import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import $ from 'jquery';

import TetrisCoreActions from '../../../server/tetris/core/action';
import AppActions from '../reducer/actions';
import reducer, { GameStates } from './reducer';
import TetrisActions from './reducer/actions';
import Board from './board';
import Next from './next';

const styles = {
    tetris: {
        height: 400,
        left: '50%',
        marginLeft: -160,
        position: 'absolute',
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
        width: 100,
        height: 80,
    },
    button: {
        position: 'absolute',
        bottom: 20,
        left: 240,
        width: 100,
        height: 40,
    },
};

class Tetris extends React.Component {
    componentWillMount() {
        this.props.registerReducer();
        this.props.resetGame();
    }

    componentDidMount() {
        $(document).keydown(this.keydownEvents.bind(this));
    }

    componentWillUnmount() {
        this.props.unregisterReducer();
        $(document).unbind('keydown', this.keydownEvents);
    }

    keydownEvents(e) {
        switch (e.keyCode) {
            case 37:
                this.props.moveLeft();
                break;
            case 39:
                this.props.moveRight();
                break;
            case 38:
                this.props.rotate();
                break;
            case 40:
                this.props.drop();
                break;
            default:
                break;
        }
    }

    renderGameControlButton() {
        let buttonText;
        let onClick;

        switch (this.props.gameState) {
            case GameStates.NOT_STARTED:
                buttonText = 'Start';
                onClick = () => { this.props.startGame(); };
                break;

            case GameStates.PAUSED:
                buttonText = 'Resume';
                onClick = () => { this.props.startGame(); };
                break;

            case GameStates.GAME_OVER:
                buttonText = 'Restart';
                onClick = () => { this.props.resetGame(); this.props.startGame(); };
                break;

            case GameStates.STARTED:
                buttonText = 'Pause';
                onClick = () => { this.props.pauseGame(); };
                break;

            default:
                return;
        }

        if (buttonText && onClick) {
            return (
                <Button onClick={onClick}>
                    {buttonText}
                </Button>
            );
        }
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
                <div className={this.props.classes.button}>
                    {this.renderGameControlButton()}
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
    unregisterReducer: () => {
        dispatch(AppActions.unregisterReducer(ownProps.id));
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
    moveLeft: () => {
        dispatch(AppActions.reduce(ownProps.id, TetrisActions.playerMove(TetrisCoreActions.MOVE_LEFT)));
    },
    moveRight: () => {
        dispatch(AppActions.reduce(ownProps.id, TetrisActions.playerMove(TetrisCoreActions.MOVE_RIGHT)));
    },
    rotate: () => {
        dispatch(AppActions.reduce(ownProps.id, TetrisActions.playerMove(TetrisCoreActions.ROTATE)));
    },
    drop: () => {
        dispatch(AppActions.reduce(ownProps.id, TetrisActions.playerMove(TetrisCoreActions.DROP)));
    },
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withStyles(styles)(Tetris));