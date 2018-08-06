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
import Hello from './hello';

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
                <Explosive
                    explosiveLoader={() => import(/* webpackChunkName: 'tetris' */ './tetris')}
                    id={getNextComponentId()}
                />
                <Explosive vertical>
                    <Explosive>
                        <Hello />
                    </Explosive>
                    <Explosive>
                        <Hello name="Stranger" />
                    </Explosive>
                </Explosive>
            </Explosive>
        </MuiThemeProvider>
    </Provider>
);

ReactDOM.render(app, document.getElementById('app'));
