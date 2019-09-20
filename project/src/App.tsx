import {Asynchronizer} from '@/Component';
import IView from '@/View/spec';
import React, {Fragment} from 'react';
import GlobalHeader from './GlobalHeader';
import View, {awaitFor} from './View';

const appRoot = document.querySelector('[app-root]');
const pathname = window.location.hash.substr(2) || 'home';
const shouldWaitFor = awaitFor[pathname as IView.View];

const App = (
  <Fragment>
    <GlobalHeader />
    {View}
  </Fragment>
);

const Component = () => (
  shouldWaitFor ? (
    <Asynchronizer awaitFor={shouldWaitFor}>
      {() => App}
    </Asynchronizer>
  ) : App
);

export {appRoot};
export default Component;
