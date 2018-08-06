import React from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';

const styles = () => ({
});

const Hello = ({ name }) => (
    <Button>{`Hello ${name}`}</Button>
);

Hello.propTypes = {
    name: PropTypes.string,
};

Hello.defaultProps = {
    name: 'Unknown',
};

export default withStyles(styles)(Hello);
