import React from 'react';
import Button from 'material-ui/Button';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
    card: {
        width: '100%',
    },
});

const Hello = ({ classes, name }) => (
    <Card className={classes.card}>
        <CardContent>
            <Button>{`Hello ${name}`}</Button>
        </CardContent>
    </Card>
);

export default withStyles(styles)(Hello);
