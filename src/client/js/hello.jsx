import React from 'react';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';

const styles = () => ({
});

const Hello = ({ name = 'Unknown' }) => (
    <Button>{`Hello ${name}`}</Button>
);

export default withStyles(styles)(Hello);
