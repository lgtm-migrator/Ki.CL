// @flow
import React from 'react';
import { HashRouter as Router, NavLink } from 'react-router-dom';

import classnames from 'classnames';

import './style.scss';

type Props = {
  children: React.Node,
  className: {} | Array | String,
  component: string,
  onClick: Function,
  to: string,
  text: string
};

const activeClassName = 'isActive';

const Link = ({ children, className, component: Wrapper, onClick, to, text, ...rest }: Props) => {
  className = classnames(className);

  const Element = ({ className }) => (
    <NavLink
      exact
      { ...{ activeClassName, className, onClick, to, ...rest } }
    >
      { children }
    </NavLink>
  );

  return (
    <Router>
      {Wrapper ? (
        <Wrapper { ...{ className } }>
          <Element />
        </Wrapper>
      ) : (
        <Element { ...{ className } }/>
      )}
    </Router>
  );
};

export default Link;
