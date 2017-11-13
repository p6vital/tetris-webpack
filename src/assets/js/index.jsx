import React from 'react';
import ReactDOM from 'react-dom';
import Loadable from 'react-loadable';

import { Provider } from 'react-redux';
import { createStore } from 'redux';

import { MuiThemeProvider, createMuiTheme, withStyles } from 'material-ui/styles';
import lightBlue from 'material-ui/colors/lightBlue';
import grey from 'material-ui/colors/grey';
import red from 'material-ui/colors/red';
import Card, { CardActions, CardContent } from 'material-ui/Card';

import { getStore } from './reducer';
import { getNextComponentId } from './utils/component-utils';
import { loadModule } from './utils/module-utils';


import Loading from './common/loading';

const theme = createMuiTheme({
    palette: {
        primary: lightBlue,
        secondary: grey,
        error: red,
    },
});

const LoadableComponent = Loadable({
    loader: () => new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, 5000);
    }).then(() => import(/* webpackChunkName: 'tetris' */ './tetris')),
    loading: Loading,
});

const app = (
    <Provider store={getStore()}>
        <MuiThemeProvider theme={theme}>
            <Card style={{ height: '200px', width: '100%', position: 'relative' }}>
                <CardContent>
                    <LoadableComponent id={getNextComponentId()} />
                </CardContent>
            </Card>
        </MuiThemeProvider>
    </Provider>
);

setTimeout(() => {
    ReactDOM.render(app, document.getElementById('app'));
}, 5000);

