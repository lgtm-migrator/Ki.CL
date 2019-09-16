import {Router} from '@/Component';
import {TransitionStyleName} from '@/Component/CSSTransition';
import React from 'react';
import About from './About';
import Home, {awaitFor as homeAwaitFor} from './Home';
import PageNotFound from './PageNotFound';
import IView from './spec';
import Style from './Style';
import Works from './Works';

const awaitFor: IView.AwaitFor = {
  home: homeAwaitFor
};

const View = (
  <Router
    appear={true}
    classNames={Style.view}
    routeIndex={0}
    transitionStyle={TransitionStyleName.fade}
  >
    {About}
    {Home}
    {Works}
    {PageNotFound}
  </Router>
);

export {awaitFor};
export default View;
