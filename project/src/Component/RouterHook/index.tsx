import IRouterHook from '@/Component/RouterHook/spec';
import {HookRouter, navigate, useRoutes} from 'hookrouter';
import React, {Fragment, ReactElement} from 'react';
import {CSSTransition, TransitionGroup} from 'react-transition-group';

const Link: React.FunctionComponent<IRouterHook.Link> = ({children, onClick, pathname}) => {
  const clickHandler: React.MouseEventHandler = async (event: IRouterHook.Event) => {
    event.preventDefault();
    onClick && onClick(event);
    navigate(event.currentTarget.pathname);
  };
  
  return (
    <a onClick={clickHandler} href={pathname} aria-disabled={window.location.pathname === pathname}>
      {children}
    </a>
  );
};

const RouterHook: React.FunctionComponent<IRouterHook.Props> = ({routes}) => {
  const routeObject: HookRouter.RouteObject = {};
  
  Object.keys(routes).forEach(
    path => {
      routeObject[path] = (params) => (
        <TransitionGroup component={Fragment}>
          {
            Object
            .keys(routes)
            .filter(pathname => window.location.pathname === pathname)
            .map(
              pathname => {
                const Instance = routes[pathname];
                
                return (
                  <CSSTransition timeout={1000} key={pathname}>
                    <Instance routes={params} />
                  </CSSTransition>
                );
              }
            ) as ReactElement[]
          }
        </TransitionGroup>
      );
    }
  );
  
  const result = useRoutes(routeObject);
  
  return result || 'empty';
};

export {Link};
export default RouterHook;
