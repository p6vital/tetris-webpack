import React from 'react';
import PropTypes from 'prop-types';

const DURATION = 500; // ms

class Explosive extends React.Component {
    static propTypes = {
        explosiveLoader: PropTypes.func.isRequired,
        explosiveDuration: PropTypes.number,
    };

    static defaultProps = {
        explosiveDuration: DURATION,
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
            <div className="explosive exploded" >
                <Component {...this.props}>
                    {this.props.children}
                </Component>
            </div>
        );
    }
}

export default Explosive;
