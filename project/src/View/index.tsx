import {RouterHook} from '@/Component';
import IRouterHook from "@/Component/RouterHook/spec";
import IView from "@/View/spec";
import React, {Fragment} from "react";
import {CSSTransition, TransitionGroup} from "react-transition-group";

const About: React.FunctionComponent = () => (
  <main>ABOUT</main>
);

const Home: React.FunctionComponent = () => (
  <main>HOME</main>
);

const Works: React.FunctionComponent = () => (
  <main>WORKS</main>
);

const View = ({routes}: IView.Props) => {
  return (
    <TransitionGroup component={Fragment}>
      {
        [
          {view: 'about', Component: About as React.FunctionComponent<{routes: IRouterHook.Routes}>},
          {view: 'home', Component: Home as React.FunctionComponent<{routes: IRouterHook.Routes}>},
          {view: 'works', Component: Works as React.FunctionComponent<{routes: IRouterHook.Routes}>}
        ]
        .sort(
          ({view}: {view: string}) => view !== routes.view ? 1 : 0
        )
        .filter(
          ({view}: {view: string}) => view === routes.view
        )
        .map(
          ({view, Component}: {view: string, Component: React.FunctionComponent<{routes: IRouterHook.Routes}>}) => (
            <CSSTransition timeout={1000} key={view} appear={true}>
              <Component routes={routes}/>
            </CSSTransition>
          )
        )
      }
    </TransitionGroup>
  );
};

const Component = () => (
  <RouterHook
    index={View}
    routes={
      { '/:view': View }
    }
  />
);

export default Component;
