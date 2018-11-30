// @flow
import React from 'react';
import { CSSTransition as CSSTransitionInstance } from 'react-transition-group';

import transitionDuration from 'get-transition-duration';

import classnames from 'classnames';

import './style.scss';

type Props = {
  className: string | Array | {},
  children: React.Node,
  component?: React.Node,
  keyValue: number | string,
  inValue: number | string,
  onEntered: (node: React.Node) => void,
  onExited: (node: React.Node) => void,
  mountOnEnter?: boolean,
  unmountOnExit?: boolean
};

const defaultClassName = 'css-transition';
const enterClassName =`${defaultClassName}-enter`;
const exitClassName =`${defaultClassName}-exit`;

const addEndListener = endListenerTimer => (node, done) => {
  const nodes = Array.from(node.parentNode.querySelectorAll(`.${enterClassName}, .${exitClassName}`));

  const duration = Math.max(...nodes.map(n => transitionDuration(n, true)));

  if (duration === 0) {
    done();
  }

  window.clearTimeout(endListenerTimer);
  endListenerTimer = window.setTimeout(done, duration);
};

const removeDoneClasses = node => {
  node.classList.remove(`${enterClassName}-done`);
  node.classList.remove(`${exitClassName}-done`);
};

const CSSTransition = ({
  className,
  children,
  component: Wrapper,
  keyValue,
  inValue,
  onEntered,
  onExited,
  ...rest
}: Props) => (
  <CSSTransitionInstance
    classNames={ defaultClassName }
    key={keyValue}
    in={inValue}
    onEntered={ node => {
      removeDoneClasses(node);

      if (!onEntered) {
        return;
      }

      onEntered(node);
    } }
    onExited={ node => {
      removeDoneClasses(node);

      if (!onExited) {
        return;
      }

      onExited(node);
    } }
    addEndListener={addEndListener()}
    {...rest}
  >
    <Wrapper {...{ className: classnames(defaultClassName, className) }}>{children}</Wrapper>
  </CSSTransitionInstance>
);

CSSTransition.defaultProps = {
  component: 'div',
  mountOnEnter: true,
  unmountOnExit: true
};

export default CSSTransition;