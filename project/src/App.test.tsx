import * as React from 'react';
import Component from './App';
import renderer, {
  ReactTestRenderer, ReactTestRendererJSON
} from 'react-test-renderer';

let component: ReactTestRenderer;
let instance: ReactTestRendererJSON;

describe('App', () => {
  beforeEach(() => {
    component = renderer.create(
      <Component/>
    );
    
    instance = component.toJSON();
  });
  
  test('should match with snapshot', () => {
    expect(instance).toMatchSnapshot();
  });
});
