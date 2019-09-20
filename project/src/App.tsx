import {Asynchronizer, GlobalHeader} from '@/Component';
import React, {Fragment} from 'react';
import View, {awaitFor} from './View';

const appRoot = document.querySelector('[app-root]');
const pathname = window.location.hash.substr(2) || 'home';
const shouldWaitFor = awaitFor[pathname];

const App = (
  <Fragment>
    <GlobalHeader transitionIn={true} />
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
