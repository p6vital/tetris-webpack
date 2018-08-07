import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Card, { CardContent } from 'material-ui/Card';
import MobileDetect from 'mobile-detect';
import Context, { ExplosiveContext } from './context';

const DURATION = 500; // ms

const DefaultComponent = ({ children = (<div />) }) => children;
const defaultLoader = () => Promise.resolve(DefaultComponent);

const md = new MobileDetect(window.navigator.userAgent);

let nextId = 0;
const getNextId = () => nextId += 1;

export class Explosive extends React.Component {
    static propTypes = {
        name: PropTypes.string,
        loader: PropTypes.func,
        duration: PropTypes.number,
        vertical: PropTypes.bool,
        className: PropTypes.string,
        parentContext: PropTypes.instanceOf(ExplosiveContext).isRequired,
        onExploding: PropTypes.func,
        onExploded: PropTypes.func,
        onChildrenExploded: PropTypes.func,
        onAllExploded: PropTypes.func,
    };

    static defaultProps = {
        name: undefined,
        duration: DURATION,
        loader: defaultLoader,
        vertical: false,
        className: undefined,
        onExploding: () => {},
        onExploded: () => {},
        onChildrenExploded: () => {},
        onAllExploded: () => {},
    }

    constructor(props) {
        super(props);

        this.id = this.props.name || getNextId();

        this.state = {
            Component: undefined,
            exploded: false,
            childrenExploded: false,
            context: new ExplosiveContext(() => {
                this.setState({
                    childrenExploded: true,
                });
            }, this),
        };
    }

    componentDidMount() {
        this.props.onExploding();

        this.props.loader()
            .then(result => (result.__esModule ? result.default : result))
            .then((Component) => {
                this.setState({
                    Component,
                });
            });
    }

    componentDidUpdate(prevProps, prevState) {
        this.checkAndSetExploded(prevState);

        const { Component, exploded } = this.state;

        if (!Component) {
            return;
        }

        if (!exploded) {
            this.waitForExplosion = setTimeout(() => {
                this.setState({
                    exploded: true,
                });
            }, this.props.duration);
        }
    }

    componentWillUnmount() {
        clearTimeout(this.waitForExplosion);
    }

    checkAndSetExploded({ exploded: prevExploded, childrenExploded: prevChildrenExploded } = {}) {
        let changed = false;

        if (!prevExploded && this.state.exploded) {
            this.props.parentContext.setExploded(this);
            this.props.onExploded();
            changed = true;
        }

        if (!prevChildrenExploded && this.state.childrenExploded) {
            this.props.onChildrenExploded();
            changed = true;
        }

        if (changed && this.state.exploded && this.state.childrenExploded) {
            this.props.onAllExploded();
        }
    }

    render() {
        const { Component, exploded } = this.state;

        return (
            <Context.Provider value={this.state.context}>
                {(!Component || !exploded) ? (
                    <div
                        className={classNames('explosive', 'exploding', this.props.className)}
                    />
                ) : (
                    <Card className={classNames('explosive', 'exploded', 'explosive-card', this.props.className)}>
                        <CardContent
                            className={classNames('explosive-card-content', {
                                vertical: md.mobile() || this.props.vertical,
                            })}
                        >
                            <Component {...this.props}>
                                {this.props.children}
                            </Component>
                        </CardContent>
                    </Card>
                )}
            </Context.Provider>
        );
    }
}

const ContextAwareExplosive = ({ children, ...props }) => (
    <Context.Consumer>
        {parentContext => (
            <Explosive
                parentContext={parentContext}
                {...props}
                ref={(explosive) => { parentContext.setExploding(explosive); }}
            >
                {children}
            </Explosive>
        )}
    </Context.Consumer>
);

export default ContextAwareExplosive;

