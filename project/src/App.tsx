import {Asynchronizer, GlobalHeader} from '@/Component';
import React, {Fragment} from 'react';
import View, {awaitFor} from './View';

const appRoot = document.querySelector('[app-root]');
const pathname = window.location.hash.substr(2) || 'home';
const shouldWaitFor = awaitFor[pathname];

const App = () => (
  <Fragment>
    {
      shouldWaitFor ? (
        <Asynchronizer awaitFor={shouldWaitFor}>
          {() => (
            <GlobalHeader transitionIn={true} />
          )}
        </Asynchronizer>
      ) : <GlobalHeader transitionIn={true} />
    }
    {View}
  </Fragment>
);

export {appRoot};
export default App;
