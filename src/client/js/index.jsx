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
            <Explosive
                name="page"
                duration={500}
                onExploded={() => {
                    console.log('Exploded.');
                }}
                onChildrenExploded={() => {
                    console.log('Children Exploded.');
                    document.getElementById('app').classList.remove('uninitialized');
                }}
            >
                <Explosive
                    name="tetris"
                    className="tetris-explosive"
                    loader={() => import(/* webpackChunkName: 'tetris' */ './tetris')}
                    id={getNextComponentId()}
                    duration={1000}
                />
                <Explosive
                    name="right"
                    vertical
                    duration={300}
                >
                    <Explosive
                        name="right-1"
                        duration={500}
                    >
                        <Hello />
                    </Explosive>
                    <Explosive
                        name="right-2"
                        duration={1000}
                    >
                        <Hello name="Stranger" />
                    </Explosive>
                    <Explosive
                        name="right-3"
                        duration={300}
                    >
                        <Hello name="There" />
                    </Explosive>
                </Explosive>
            </Explosive>
        </MuiThemeProvider>
    </Provider>
);

ReactDOM.render(app, document.getElementById('app'));
