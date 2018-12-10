// @flow
import React from 'react';

import { Link } from 'Component';

import { siteName, view } from 'content/resources';

import './style.scss';

type ClassName = {} | Array | String;

type Node = React.Node;

type Props = {
  className?: ClassName,
  component?: Node
};

const { home } = view;
const { path } = home;

const Logo = ({ className, component }: Props) => (
  <Link { ...{ text: siteName, to: path, className, component } } />
);

Logo.defaultProps = {
  className: 'logo',
  component: 'h1'
};

export default Logo;
