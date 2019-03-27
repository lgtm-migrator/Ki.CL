// @flow
import React from 'react';
import decode from 'unescape';

import { Image } from 'Component';

import { randomId } from 'Helper';

import './style';

type Props = {
  modules: [
    {
      text_plain: string,
      type: 'image' | 'text',
      src: string,
      height: number,
      width: number
    }
  ]
};

const Modules = ({ modules, name }: Props) => (
  <section className="view-work-modules">
    <h1>{name}</h1>
    {modules.map(
      ({
 text_plain: textPlain, type, src, height, width,
}, index) => {
        const key = randomId();

        switch (type) {
          case 'image':
            return (
              <Image
                alt={`img_${index}`}
                height={height}
                key={key}
                src={src}
                width={width}
              />
            );
          case 'text':
            return <p key={key}>{decode(textPlain)}</p>;
          default:
            return null;
        }
      },
    )}
  </section>
);

Modules.defaultProps = {};

export default Modules;
