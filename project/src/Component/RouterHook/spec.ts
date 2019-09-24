import React, {MouseEvent} from 'react';

declare module IRouterHook {
  type Component = React.FunctionComponent<{ routes: Routes }>;
  
  type Routes = {
    [path: string]: Component
  };
  
  type Event = MouseEvent<HTMLAnchorElement>;
  
  interface Link extends React.AnchorHTMLAttributes<{}> {
    pathname: string;
  }
  
  interface Props {
    routes: Routes;
  }
}

export default IRouterHook;
