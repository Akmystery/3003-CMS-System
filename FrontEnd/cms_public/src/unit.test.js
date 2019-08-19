import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
import App from './App';
import LiveFeed from './LiveFeed';
import Nav from './Nav';
import MapUI from './MapUI';
import Haze from './Haze';
import Terrorist from './Terrorist';
import Dengue from './Dengue';

configure({ adapter: new Adapter() });

describe('<App/>',() => {
  it('renders Nav Component', () => {
    const unit_test = shallow(<App/>);
    expect(unit_test.find(Nav).length).toEqual(1);
  });

  it('renders LiveFeed Component', () => {
    const unit_test = shallow(<App/>);
    expect(unit_test.find(LiveFeed).length).toEqual(1);
  });

  it('renders MapUI Component', () => {
    const unit_test = shallow(<App/>);
    expect(unit_test.find(MapUI).length).toEqual(1);
  });
});
