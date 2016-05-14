import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import Todo from '../Todo.js';

describe('<Todo />', () => {
    describe('when render <Todo /> components', () => {
        it('should render a li element', () => {
            // givne
            const props = {
                text: "blahblah"
            };

            // when
            const wrapper = shallow(<Todo { ...props }/>);

            // then
            expect(wrapper.is("li")).to.equal(true);
        });
    });
});