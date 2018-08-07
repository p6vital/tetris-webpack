import React from 'react';
import { Explosive } from '.';

export class ExplosiveContext {
    constructor(onChildrenExploded = () => {}, explosive) {
        if (explosive && !(explosive instanceof Explosive)) {
            throw new Error('Input must be Explosive');
        }

        this.id = explosive && explosive.id;
        this.exploding = {};
        this.exploded = {};
        this.onChildrenExploded = onChildrenExploded;

        this.setExploding = this.setExploding.bind(this);
        this.setExploded = this.setExploded.bind(this);
        this.checkChildrenExploded = this.checkChildrenExploded.bind(this);
    }

    setExploding(child) {
        if (!(child instanceof Explosive)) {
            return;
        }

        this.exploding[child.id] = child;
    }

    setExploded(child) {
        if (!(child instanceof Explosive)) {
            return;
        }

        this.exploded[child.id] = child;

        this.checkChildrenExploded();
    }

    checkChildrenExploded() {
        const childrenExploded = Object.keys(this.exploding).every(id => this.exploded[id]);

        if (childrenExploded && this.id) {
            console.log(`Children of Explosive ${this.id}: ${Object.keys(this.exploded)} exploded.`);

            this.onChildrenExploded();
        }
    }
}

const context = React.createContext(new ExplosiveContext());

export const { Provider, Consumer } = context;
export default context;
