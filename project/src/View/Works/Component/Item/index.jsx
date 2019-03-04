// @flow
import React from 'react';

import { Asynchronizer, Link } from 'Component';

import { image, caches } from 'API';

import { classname } from './style';

type Module = {
  type: string
};

type Project = {
  allow_comments: number,
  cover: string,
  description: string,
  id: number,
  modified_on: number,
  modules: Array<Module>,
  name: string,
  published_on: number,
  url: string
};

type Props = {
  project?: Project
};

const Item = ({ project }: Props) => {
  const { id, name, modules } = project;
  const { src } = modules.filter(module => module.type === 'image')[0];
  const path = `/works/${id}`;

  return (
    <li className={classname}>
      <figure>
        <Asynchronizer
          awaitCache={caches[src]}
          awaitFor={() => image({ path: src })}
          iconOnly
        >
          {() => <img src={src} alt={name} />}
        </Asynchronizer>
        <figcaption>
          <Link title={name} to={path}>
            {name}
          </Link>
        </figcaption>
      </figure>
    </li>
  );
};

Item.defaultProps = {
  project: {}
};

export default Item;
