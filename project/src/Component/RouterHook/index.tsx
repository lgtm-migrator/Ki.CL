import IRouterHook from "@/Component/RouterHook/spec";
import React from 'react';
import {HookRouter, useRoutes} from 'hookrouter';

const RouterHook: React.FunctionComponent<IRouterHook.Props> = ({ index: IndexComponent, routes }) => {
  const routeObject: HookRouter.RouteObject = {};
  
  Object.keys(routes).forEach(
    path => {
      const Component: React.FunctionComponent<{routes: IRouterHook.Routes}> = routes[path];
  
      routeObject[path] = params => <Component routes={params}/>
    }
  );
  
  if (!routeObject['/'] && IndexComponent) {
    routeObject['/'] = () => <IndexComponent routes={{ view: 'home' }}/>;
  }
  
  const result = useRoutes(routeObject);
  
  return result || 'empty';
};

export default RouterHook;
