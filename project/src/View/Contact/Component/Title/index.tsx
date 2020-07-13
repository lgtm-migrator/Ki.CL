import resources from '$/resources';
import { Types } from '@/Component/CSSTransition';
import React from 'react';
import Style from './Style';
import { Props } from './spec';

const {
  view: {
    contact: {
      content: { title },
    },
  },
} = resources;

const Title: React.FunctionComponent<Props> = (props) => (
  <Types.Fade {...props}>
    <h1 data-view-component={Style.default}>{title}</h1>
  </Types.Fade>
);

export default Title;
