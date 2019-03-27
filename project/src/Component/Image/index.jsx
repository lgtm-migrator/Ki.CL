// @flow
import React from 'react';

import { Asynchronizer } from 'Component';

import './style';

type Props = {
  alt: string,
  height: number,
  src: string,
  width: number
};

const caches = new Map();

const fetch = ({ src }) => new Promise((resolve, reject) => {
  if (caches.has(src)) {
    resolve({ src });
    return;
  }

  const img = new window.Image();

  img.onload = () => {
    caches.set(src, img);
    resolve({ src });
  };

  img.onerror = reject;

  img.src = src;
});

const Image = ({
 alt, height, src, width,
}) => (
  <img alt={alt} height={height} src={src} width={width} />
);

const Component = ({
 alt, height, src, width,
}: Props) => (
  <div className="image">
    <Asynchronizer
      awaitCache={caches.get(src)}
      awaitFor={() => fetch({ src })}
      iconOnly
    >
      {() => <Image alt={alt} height={height} src={src} width={width} />}
    </Asynchronizer>
  </div>
);

export default Component;
