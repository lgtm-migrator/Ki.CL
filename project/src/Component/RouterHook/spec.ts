import React from 'react';

declare module IRouterHook {
  type Component = React.FunctionComponent<{routes: Routes}>;
  
  type Routes = {
    [path: string]: Component
  };
  
  interface Props {
    index?: Component;
    routes: Routes;
  }
}

export default IRouterHook;
