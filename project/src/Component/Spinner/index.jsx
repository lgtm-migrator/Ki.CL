// @flow
import React from 'react';
import classnames from 'classnames';

import { TiMediaRecord, TiMediaRecordOutline } from 'react-icons/ti';

import { CSSTransition } from 'Component';

import { component } from 'content/resources';

import { icononlyclassname } from './style';

type Props = {
  className?: string,
  iconOnly?: Boolean,
  show?: Boolean,
  message?: String
};

const {
  spinner: {
    content: {
      default: { message },
    },
  },
} = component;

const Spinner = ({
 className, iconOnly, show, message,
}: Props) => {
  const classNames = classnames(
    'spinner',
    { [`${icononlyclassname}`]: iconOnly },
    className,
  );

  return (
    <CSSTransition transitionIn={show} transitionStyle="fade">
      <div className={classNames} aria-label={message}>
        <div>
          <TiMediaRecord />
          <TiMediaRecordOutline />
        </div>
        {message && <p className="text">{message}</p>}
      </div>
    </CSSTransition>
  );
};

Spinner.defaultProps = {
  className: '',
  iconOnly: false,
  show: true,
  message,
};

export default Spinner;
