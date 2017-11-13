import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { createStore } from 'redux';

import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import lightBlue from 'material-ui/colors/lightBlue';
import grey from 'material-ui/colors/grey';
import red from 'material-ui/colors/red';

import { getStore } from './reducer';

import { getNextComponentId } from './utils/component-utils';

const theme = createMuiTheme({
    palette: {
        primary: lightBlue,
        secondary: grey,
        error: red,
    },
});

import(/* webpackChunkName: 'tetris' */ './tetris').then(({ default: Tetris }) => {
    const app = (
        <Provider store={getStore()}>
            <MuiThemeProvider theme={theme}>
                <Tetris id={getNextComponentId()} />
            </MuiThemeProvider>
        </Provider>
    );

    ReactDOM.render(app, document.getElementById('app'));
});
