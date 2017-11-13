import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    size: PropTypes.number,
};

const defaultProps = {
    size: 100,
};

const Loading = ({ size }) => (
    <div style={{
        background: 'url(/assets/static/image/loading.gif) no-repeat',
        width: `${size}px`,
        height: `${size}px`,
        backgroundSize: `${size}px`,
        position: 'absolute',
        left: '50%',
        top: '50%',
        marginLeft: `-${size / 2}px`,
        marginTop: `-${size / 2}px`,
    }}
    />
);

Loading.propTypes = propTypes;
Loading.defaultProps = defaultProps;

export default Loading;
