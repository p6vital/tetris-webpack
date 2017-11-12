import React from 'react';

class Hello extends React.Component {
    render() {
        return (
            <div>{`Hi ${this.props.name}`}</div>
        );
    }
}

export default Hello;