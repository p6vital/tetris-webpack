import React from 'react';
import ReactDOM from 'react-dom';

import(/* webpackChunkName: 'hello' */ './hello').then(({ default: Hello }) => {
    ReactDOM.render(
        <Hello name="World" />,
        document.getElementById('app'),
    );
});
