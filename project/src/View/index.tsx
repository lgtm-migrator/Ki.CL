import {RouterHook} from '@/Component';
import React from 'react';

const About: React.FunctionComponent = () => (
  <main>ABOUT</main>
);

const Home: React.FunctionComponent = () => (
  <main>HOME</main>
);

const Works: React.FunctionComponent = () => (
  <main>WORKS</main>
);

const routes = {
  '/': Home,
  '/about': About,
  '/works': Works
};

const Component = () => (
  <RouterHook routes={routes} />
);

export default Component;
