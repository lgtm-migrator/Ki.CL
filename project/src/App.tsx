import {Link} from '@/Component/RouterHook';
import React, {Fragment} from 'react';
import View from './View';

const appRoot = document.querySelector('[app-root]');

const App = () => (
  <Fragment>
    <Link pathname={'/'}>
      Home
    </Link>
    <Link pathname={'/about'}>
      About
    </Link>
    <Link pathname={'/works'}>
      Works
    </Link>
    <View />
  </Fragment>
);

export {appRoot};
export default App;
