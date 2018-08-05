export const ActionTypes = {
    REGISTER_REDUCER: 'REGISTER_REDUCER',
    UNREGISTER_REDUCER: 'UNREGISTER_REDUCER',
    REDUCE: 'REDUCE',
};

const registerReducer = (componentId, reducer) => ({
    type: ActionTypes.REGISTER_REDUCER,
    componentId,
    reducer,
});

const unregisterReducer = componentId => ({
    type: ActionTypes.UNREGISTER_REDUCER,
    componentId,
});

const reduce = (componentId, data) => ({
    type: ActionTypes.REDUCE,
    componentId,
    data,
});

export default {
    registerReducer,
    unregisterReducer,
    reduce,
};
