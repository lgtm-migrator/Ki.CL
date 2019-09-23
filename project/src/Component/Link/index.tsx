import React from 'react';
import {NavLink} from 'react-router-dom';
import ILink from './spec';
import Style from './Style';

const Link: React.FunctionComponent<ILink.Props> = (
  {
    children,
    className: wrapperClassName,
    component: Wrapper,
    onClick,
    onMouseOver,
    to
  }) => {
  return (
    Wrapper ? (
      <Wrapper className={wrapperClassName}>
        <NavLink
          activeClassName={Style.active}
          data-component={Style.default}
          exact={true}
          onClick={onClick}
          onMouseOver={onMouseOver}
          to={to}
        >
          {children}
        </NavLink>
      </Wrapper>
    ) : (
      <NavLink
        activeClassName={Style.active}
        data-component={Style.default}
        className={wrapperClassName}
        exact={true}
        onClick={onClick}
        onMouseOver={onMouseOver}
        to={to}
      >
        {children}
      </NavLink>
    )
  );
};

export default Link;
