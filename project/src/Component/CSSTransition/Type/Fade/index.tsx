import CSSTransition from '@/Component/CSSTransition';
import classnames from 'classnames';
import React, { FunctionComponent } from 'react';
import { useHandlers } from '@/Component/CSSTransition/Hook';
import Style from './Style';
import { Props, Type } from './spec';

const { default: className } = Style;

const type: Type = 'Fade';

const Fade: FunctionComponent<Props> = ({
  addEndListener,
  children,
  classNames,
  onEntered: enteredHandler,
  onExited: exitedHandler,
  ...props
}) => {
  const { onEntered, onExited } = useHandlers({
    addEndListener,
    onEntered: enteredHandler,
    onExited: exitedHandler,
    type,
  });

  return (
    <CSSTransition
      {...props}
      classNames={classnames(classNames, className)}
      onEntered={onEntered}
      onExited={onExited}
    >
      {children}
    </CSSTransition>
  );
};

export { className, type };
export default Fade;