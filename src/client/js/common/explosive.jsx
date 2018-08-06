import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Card, { CardContent } from 'material-ui/Card';

const DURATION = 500; // ms

const DefaultComponent = ({ children }) => children;
const defaultLoader = () => Promise.resolve(DefaultComponent);

class Explosive extends React.Component {
    static propTypes = {
        explosiveLoader: PropTypes.func,
        explosiveDuration: PropTypes.number,
        vertical: PropTypes.bool,
    };

    static defaultProps = {
        explosiveDuration: DURATION,
        explosiveLoader: defaultLoader,
        vertical: false,
    }

    constructor(props) {
        super(props);

        this.state = {};
    }

    componentDidMount() {
        this.props.explosiveLoader()
            .then(result => (result.__esModule ? result.default : result))
            .then((Component) => {
                this.setState({
                    Component,
                    exploded: false,
                });
            });
    }

    componentDidUpdate() {
        const { Component, exploded } = this.state;

        if (Component && !exploded) {
            this.waitForExplosion = setTimeout(() => {
                this.setState({
                    exploded: true,
                });
            }, this.props.explosiveDuration);
        }
    }

    componentWillUnmount() {
        clearTimeout(this.waitForExplosion);
    }

    render() {
        const { Component, exploded } = this.state;

        if (!Component) {
            // Place holder
            return (
                <div className="explosive" />
            );
        }

        if (!exploded) {
            // Exploding
            return (
                <div className="explosive exploding" />
            );
        }

        return (
            <Card className="explosive exploded explosive-card">
                <CardContent
                    className={classNames('explosive-card-content', {
                        vertical: this.props.vertical,
                    })}
                >
                    <Component {...this.props}>
                        {this.props.children}
                    </Component>
                </CardContent>
            </Card>
        );
    }
}

export default Explosive;
