import resources from '$/resources';
import {Route, withRouter} from '@/Component/Router';
import IHome from '@/View/Home/spec';
import React from 'react';
import './Style';

const awaitFor = require('../../../asset/image/big.sur.png');

const {
  view: {
    home: {
      path
    }
  }
} = resources;

const Home: React.FunctionComponent<IHome.Props> = () => (
  <main data-routes='home' />
);

const Component = withRouter(Home);

export {awaitFor, path};
export default <Route path={path} exact={true} component={Component} />;
