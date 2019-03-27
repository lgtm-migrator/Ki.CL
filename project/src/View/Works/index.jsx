// @flow
import React from 'react';

import { Asynchronizer } from 'Component';
import { Route } from 'Component/Router';

import { works, caches } from 'API';

import resources from 'content/resources';

import Anchor from './Anchor';
import View from './View';

import './style';

type Props = {
  data?: Array
};

const {
  view: {
    works: {
      content: { loader },
      path,
    },
  },
} = resources;

const Works = ({ data }: Props) => (
  <React.Fragment>
    <Anchor data={data} />
  </React.Fragment>
);

const Component = ({ match }) => (
  <main data-routes="works">
    <View />
    <Asynchronizer
      awaitCache={caches.get(path)}
      awaitFor={works}
      awaitMessage={loader.text}
    >
      {({ data }) => <Works data={data} match={match} />}
    </Asynchronizer>
  </main>
);

Works.defaultProps = {
  data: [],
};

export default <Route path={path} render={Component} />;
