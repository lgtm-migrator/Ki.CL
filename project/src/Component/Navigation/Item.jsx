// @flow
import React from 'react';
import classnames from 'classnames';

import { Link } from 'Component';
import { withRouter } from 'Component/Router';

import resources from 'content/resources';

type Location = {
  pathname: string
};

type Props = {
  children?: React.Node,
  location: Location,
  onClick?: () => void,
  path?: string,
  title?: string
};

const { home } = resources.view;
const { path, name, name: title } = home;

const Item = ({
 children, location, onClick, path, title, ...rest
}: Props) => {
  const { pathname } = location;
  const Component = children;
  const isValidElement = React.isValidElement(Component);
  const isFunction = typeof Component === 'function';

  const className = classnames({
    isActive: pathname === path,
  });

  const Child = () => {
    if (isValidElement) {
      return <Component path={path} title={title} {...rest} />;
    }

    if (isFunction) {
      return Component({ path, title, ...rest });
    }

    return Component;
  };

  return (
    <li className={className}>
      <Link to={path} title={title} onClick={onClick}>
        <Child />
      </Link>
    </li>
  );
};

Item.defaultProps = {
 path, children: name, onClick() {}, title,
};

export default withRouter(Item);
