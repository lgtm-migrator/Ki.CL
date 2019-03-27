// @flow
import React from 'react';

import { Link } from 'Component';

import { siteName, view } from 'content/resources';

import './style';

type Node = React.Node;

type Props = {
  component?: Node,
  onClick: (event?: Event) => void
};

const { home } = view;
const { path } = home;

const className = 'logo';

const Logo = ({ component, nonInteractive, onClick }: Props) => {
  const Content = () => <span>{siteName}</span>;
  const Element = component;

  if (nonInteractive) {
    return (
      <Element className={className} onClick={onClick}>
        <Content />
      </Element>
    );
  }

  if (onClick) {
    throw new Error(
      'onClick should not be defined when nonInteractive is defined',
    );
  }

  return (
    <Link to={path} className={className} component={Element}>
      <Content />
    </Link>
  );
};

Logo.defaultProps = {
  component: 'h1',
};

export default Logo;
