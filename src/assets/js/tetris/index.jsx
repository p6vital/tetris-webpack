import React from 'react';
import { connect } from 'react-redux';

import Actions from '../reducer/actions';
import reducer from './reducer';

class Tetris extends React.Component {
    componentWillMount() {
        this.props.registerReducer();
    }

    render() {
        return (
            <div>Tetris</div>
        );
    }
}

const mapStateToProps = (state, ownProps) => state[ownProps.id] || {};

const mapDispatchToProps = (dispatch, ownProps) => ({
    registerReducer: () => {
        dispatch(Actions.registerReducer(ownProps.id, reducer));
    },
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Tetris);
