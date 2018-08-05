import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';

import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import lightBlue from 'material-ui/colors/lightBlue';
import grey from 'material-ui/colors/grey';
import red from 'material-ui/colors/red';

import { getStore } from './reducer';
import { getNextComponentId } from './utils/component-utils';

import Explosive from './common/explosive';

const theme = createMuiTheme({
    palette: {
        primary: lightBlue,
        secondary: grey,
        error: red,
    },
});

const app = (
    <Provider store={getStore()}>
        <MuiThemeProvider theme={theme}>
            <Explosive>
                <Explosive>
                    <Explosive
                        explosiveLoader={() => import(/* webpackChunkName: 'tetris' */ './tetris')}
                        id={getNextComponentId()}
                    />
                </Explosive>
            </Explosive>
        </MuiThemeProvider>
    </Provider>
);

ReactDOM.render(app, document.getElementById('app'));
