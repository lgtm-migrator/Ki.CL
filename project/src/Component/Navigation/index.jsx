// @flow
import React from 'react';
import classnames from 'classnames';

import { randomId } from 'Helper';

import resources from 'content/resources';

import Item from './Item';

import './style';

type Items = {
  path: string,
  title: string
};

type Props = {
  className: string,
  children: React.Node,
  items?: Array<Items>,
  onClick(): void,
  vertial?: boolean
};

const { view } = resources;

const basePath = view.home.path;

const defaultProps = {
  items: Object.keys(view)
    .filter(page => !view[page].excluded && view[page].path !== basePath)
    .map((page) => {
      const { name } = view[page];

      return { ...view[page], title: name };
    }),
  vertial: false,
};

const Navigation = ({
  className,
  children,
  items,
  onClick,
  vertial,
}: Props) => {
  const classNames = classnames(className, {
    isVertial: vertial,
  });

  return (
    <nav className={classNames} role="navigation">
      <ul>
        {items.map(
          ({
           key = randomId(), path, title, ...rest
          }) => (
            <Item
              key={key}
              onClick={onClick}
              path={path}
              title={title}
              {...rest}
            >
              {children || title}
            </Item>
          ),
        )}
      </ul>
    </nav>
  );
};

Navigation.defaultProps = defaultProps;

export { defaultProps };
export default Navigation;
