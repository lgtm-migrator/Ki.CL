import {Router} from '@/Component';
import {TransitionStyle} from '@/Component/CSSTransition';
import React from 'react';
import Work from './Work';

const View = (
  <Router
    classNames='works-view'
    routeIndex={1}
    transitionStyle={TransitionStyle.name.fade}
  >
    {Work}
  </Router>
);

export default View;
