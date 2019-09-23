import React, {Fragment} from 'react';
import View from './View';
import {navigate} from 'hookrouter';

const appRoot = document.querySelector('[app-root]');

const onClick: React.MouseEventHandler<React.MouseEvent> = event => {
  event.preventDefault();
  navigate(event.currentTarget.pathname);
};

const App = () => (
  <Fragment>
    <a onClick={onClick} href={'/'}>
      Home
    </a>
    <a onClick={onClick} href={'/about'}>
      About
    </a>
    <a onClick={onClick} href={'/works'}>
      Works
    </a>
    <View/>
  </Fragment>
);

export {appRoot};
export default App;
