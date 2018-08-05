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

import Explosive from './common/explosive';


import Loading from './common/loading';

const theme = createMuiTheme({
    palette: {
        primary: lightBlue,
        secondary: grey,
        error: red,
    },
});

// const LoadableComponent = Loadable({
//     loader: () => import(/* webpackChunkName: 'tetris' */ './tetris'),
//     loading: Loading,
// });
// <LoadableComponent id={getNextComponentId()} />

const app = (
    <Provider store={getStore()}>
        <MuiThemeProvider theme={theme}>
            <Card style={{ height: 440, width: '100%', position: 'relative' }}>
                <CardContent>
                    <Explosive
                        explosiveLoader={() => import(/* webpackChunkName: 'tetris' */ './tetris')}
                        id={getNextComponentId()}
                    />
                </CardContent>
            </Card>
        </MuiThemeProvider>
    </Provider>
);

ReactDOM.render(app, document.getElementById('app'));
