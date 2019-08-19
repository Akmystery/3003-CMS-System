import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import {shallow, configure} from 'enzyme';
import App from './App';
import Nav from './Nav';
import Form from './Form';
import sinon from 'sinon';

configure({adapter: new Adapter()});

describe('<App/>', () => {
  it('renders Nav Component', () => {
    const unit_test = shallow(<App/>);
    expect(unit_test.find(Nav).length).toEqual(1);
  });

  it('renders Nav Component', () => {
    const unit_test = shallow(<App/>);
    expect(unit_test.find(Form).length).toEqual(1);
  });
});

describe('<Form/>', () => {
  it('renders 11 input field', () => {
    const unit_test = shallow(<Form/>);
    expect(unit_test.find("input").length).toEqual(11);
  });

  it('renders 2 button', () => {
    const unit_test = shallow(<Form/>);
    expect(unit_test.find("button").length).toEqual(2);
  });
});
