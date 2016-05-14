import { addTodo } from '../index.js'
import { expect } from 'chai';

describe('actions', () => {
    it('should create an action to add a todo', () => {
        // given
        const text = 'Finish docs';
        const expectedAction = {
            type: 'ADD_TODO',
            id: 0,
            text
        };

        // when
        var actualAction = addTodo(text);

        // then
        expect(actualAction).to.eql(expectedAction)
    })
});