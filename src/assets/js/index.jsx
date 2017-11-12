import React from 'react';
import ReactDOM from 'react-dom';

import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import lightBlue from 'material-ui/colors/lightBlue';
import grey from 'material-ui/colors/grey';
import red from 'material-ui/colors/red';

const theme = createMuiTheme({
    palette: {
        primary: lightBlue,
        secondary: grey,
        error: red,
    },
});

import(/* webpackChunkName: 'hello' */ './hello').then(({ default: Hello }) => {
    const app = (
        <MuiThemeProvider theme={theme}>
            <Hello name="World" />
        </MuiThemeProvider>
    );

    ReactDOM.render(app, document.getElementById('app'));
});
