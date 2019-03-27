// @flow
import React from 'react';

import { about, caches } from 'API';

import {
 Asynchronizer, CSSTransition, Logo, Navigation,
} from 'Component';
import { Route } from 'Component/Router';

import resources from 'content/resources';

import State from './State';

import './style';

const {
  view: {
    home: {
      content: { loader, heading },
      path,
    },
  },
} = resources;

const Home = ({ atLanding, data, updateAtLanding }) => (
  <React.Fragment>
    <CSSTransition transitionIn={atLanding}>
      <Logo
        component="h1"
        nonInteractive
        onClick={() => {
          updateAtLanding(false);
        }}
      />
    </CSSTransition>
    <CSSTransition transitionIn={!atLanding}>
      <section>
        <h1>{heading}</h1>
        <p>{data.sections.About}</p>
        <Navigation />
      </section>
    </CSSTransition>
  </React.Fragment>
);

const Instance = State.connecter(Home);

const Component = () => (
  <main data-routes="home">
    <Asynchronizer
      awaitCache={caches.get('/about')}
      awaitFor={about}
      awaitMessage={loader.text}
      iconOnly
    >
      {({ data }) => <Instance data={data} />}
    </Asynchronizer>
  </main>
);

export default <Route exact path={path} render={Component} />;
