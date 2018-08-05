export const loadModule = (loader, accessor) => loader().then((obj) => {
    if (!obj) {
        throw new Error('Cannot load Module');
    }

    if (!obj.__esModule) {
        return obj;
    }

    if (!accessor) {
        return obj.default;
    }

    return obj[accessor];
});
