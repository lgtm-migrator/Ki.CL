// @flow
import React from 'react';

import Router, { withRouter } from 'Component/Router';

import { works, caches } from 'API';

import resources from 'content/resources';

import Work from './Work';

import './style';

const {
  view: {
    works: {
      path,
    },
  },
} = resources;

const routeIndex = 2;
let transitionIndex = 0;

async function onEnter({ history }) {
  const { location: { pathname } } = history;

  if (pathname !== path) {
    return true;
  }

  const result = await works();

  // To replace (Direct) to the first work route
  history.replace(`${path}/${result[0].id}`);

  return false;
}

async function onExit({ history }) {
  const { action, location: { pathname: incomingPathname } } = history;

  const result = await works();

  // To prevent '/works' get inject to data-exited-routes
  // when history got replace from onEnter above
  return action !== 'REPLACE' && !result.some(({ id }) => incomingPathname.endsWith(id));
}

function transitionStyle({ history }) {
  const { location: { pathname } } = history;
  const cache = caches.get(path);

  let transitionStyle = "slidedown";

  if (cache) {
    cache.forEach(({ id }, index) => {
      if (!pathname.endsWith(id)) {
        return;
      }

      if (index > transitionIndex) {
        transitionStyle = "slideup";
      }

      transitionIndex = index;
    });
  }

  return transitionStyle;
}

const Component = ({ history }) => (
  <Router
    routeIndex={routeIndex}
    onEnter={onEnter}
    onExit={onExit}
    transitionStyle={transitionStyle({ history })}
  >
    {Work}
  </Router>
);

export default withRouter(Component);
