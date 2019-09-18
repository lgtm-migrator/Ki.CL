import CSSTransition, {TransitionStyle} from '@/Component/CSSTransition';
import React from 'react';
import ISpinner from './spec';
import Style from './Style';

const Spinner: React.FunctionComponent<ISpinner.Props> = ({
  transitionIn,
  onExited
}) => {
  return (
    <CSSTransition transitionIn={transitionIn} transitionStyle={TransitionStyle.name.zoomIn} onExited={onExited}>
      <svg data-component={Style.default}>
        <circle cx='70%' cy='30%' r='30%' />
        <circle cx='70%' cy='70%' r='30%' />
        <text>Loading</text>
      </svg>
    </CSSTransition>
  )
};

export default Spinner;
