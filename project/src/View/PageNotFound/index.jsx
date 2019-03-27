// @flow
import React from 'react';

import { Route } from 'Component/Router';
import { interpolate } from 'Helper';

import resources from 'content/resources';

const { view: { pageNotFound: { content } } } = resources;

const PageNotFound = ({ location }) => (
  <main>
    <h1>{interpolate(content.message, location)}</h1>
  </main>
);

export default (
  <Route render={PageNotFound} />
);
