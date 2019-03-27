// @flow
import React from 'react';

import { Asynchronizer, Image, Navigation } from 'Component';
import { withRouter } from 'Component/Router';

import { work, caches } from 'API';

import resources from 'content/resources';

import './style';

type Data = {
  name: string,
  id: number
};

type Props = {
  data: Data[]
};

const {
  view: {
    works: { path },
  },
} = resources;

const Item = ({ id, title, path }) => (
  <Asynchronizer
    awaitCache={caches.get(path)}
    awaitFor={() => work({ projectId: id })}
    iconOnly
  >
    {({ data }) => {
      const { cover } = data;
      return <Image alt={title} src={cover} />;
    }}
  </Asynchronizer>
);

let anchorAnimationFrame;

const Anchor = ({ data, history }: Props) => {
  const onClick = async (event) => {
    const { hash } = event.target.closest('a');
    const pathname = hash.substr(1);

    const onScorll = () => {
      const { kicl: { ref: { scrollTop } } } = window;

      if (scrollTop === 0) {
        window.cancelAnimationFrame(anchorAnimationFrame);

        history.push(pathname);

        return;
      }

      anchorAnimationFrame = window.requestAnimationFrame(onScorll);
    };

    event.persist();
    event.preventDefault();

    onScorll();

    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };

  window.cancelAnimationFrame(anchorAnimationFrame);

  return (
    <Navigation
      className="view-works-anchor"
      items={data.map(
        ({ id, name }) => ({ id, path: `${path}/${id}`, title: name }),
      )}
      onClick={onClick}
      vertial
    >
      {({ id, path, title }) => <Item id={id} path={path} title={title} />}
    </Navigation>
  );
};

export default withRouter(Anchor);
