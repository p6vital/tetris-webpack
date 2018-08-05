import { createStore } from 'redux';

import { ActionTypes } from './actions';

const updateComponentState = (state, componentId, componentState) => Object.assign({}, state, { [componentId]: componentState });

const getInitialState = () => ({});

const componentReducers = {};

const reducer = (state = getInitialState(), action) => {
    const { componentId } = action;

    if (typeof componentId === 'undefined') {
        return state;
    }

    switch (action.type) {
        case ActionTypes.REGISTER_REDUCER:
            const { reducer } = action;
            componentReducers[componentId] = reducer;
            return updateComponentState(state, componentId, {});

        case ActionTypes.UNREGISTER_REDUCER:
            delete componentReducers[componentId];
            return updateComponentState(state, componentId, undefined);

        case ActionTypes.REDUCE:
            const componentReducer = componentReducers[componentId];

            if (typeof componentReducer !== 'function') {
                return state;
            }

            const componentState = state[componentId] || {};
            const updatedComponentState = componentReducer(componentState, action.data, componentId);

            return updateComponentState(state, componentId, updatedComponentState);

        default:
            return state;
    }
};

const store = createStore(reducer);

window.StateManager = { store, componentReducers };

export const getComponentReducers = () => componentReducers;
export const getStore = () => store;
