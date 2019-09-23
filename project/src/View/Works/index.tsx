import resources from '$/resources';
import {Route} from '@/Component/Router';
import React from 'react';
import IWorks from './spec';
import './Style';

const {view: {works: {path}}} = resources;

const Works: React.FunctionComponent<IWorks.Props> = () => (
  <main data-routes='works'>
    <h1>Works</h1>
  </main>
);

export {path};
export default <Route path={path} component={Works} />;
