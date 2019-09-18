import resources from '$/resources';
import {CSSTransition, Logo, Navigation} from '@/Component';
import {TransitionStyle} from '@/Component/CSSTransition';
import React from 'react';
import IGlobalHeader from './spec';
import Style from './Style';

const {
  view: {
    about,
    contact,
  },
  component: {
    globalHeader: {
      content: {heading}
    }
  }
} = resources;

const GlobalHeader: React.FunctionComponent<IGlobalHeader.Props> = ({
  transitionIn = true
}) => (
  <CSSTransition
    transitionIn={transitionIn}
    transitionStyle={TransitionStyle.name.fade}
  >
    <header role='banner' data-component={Style.default}>
      <Logo isSquare={true} />
      <h2>{heading}</h2>
      <Navigation
        inline={true}
        items={[
          {children: about.name, to: about.path},
          {children: contact.name, to: contact.path}
        ]}
      />
    </header>
  </CSSTransition>
);

export default GlobalHeader;
