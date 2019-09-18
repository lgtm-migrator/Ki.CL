import {Router} from '@/Component';
import {TransitionStyle} from '@/Component/CSSTransition';
import ITransitionStyle from '@/Component/CSSTransition/Style/TransitionStyle/spec';
import IRouter from "@/Component/Router/spec";
import React from 'react';
import About, {path as aboutPath} from './About';
import Home, {awaitFor as homeAwaitFor} from './Home';
import PageNotFound from './PageNotFound';
import IView from './spec';
import Style from './Style';
import Works from './Works';

const awaitFor: IView.AwaitFor = {
  home: homeAwaitFor
};

const transitionStyle: IRouter.TransitionStyleFunction = ({ history }) => {
  let style: ITransitionStyle.Key = 'fade';
  
  if (
    [aboutPath].some(path => path === history.location.pathname)
  ) {
    style = 'slideRight';
  }
  
  return TransitionStyle.name[style];
};

const View = (
  <Router
    appear={true}
    classNames={Style.view}
    routeIndex={0}
    transitionStyle={transitionStyle}
  >
    {About}
    {Home}
    {Works}
    {PageNotFound}
  </Router>
);

export {awaitFor};
export default View;
