import assert from 'assert';

import addOne from '../../src/server/add-one';

describe('Test addOne', () => {
    it('2 + 1', () => {
        assert.equal(addOne(2), 3, '1 + 2 should be 3');
    });
});
