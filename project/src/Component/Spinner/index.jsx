// @flow
import React from 'react';
import classnames from 'classnames';

import IcoMoon from 'react-icomoon';
import Fittext from 'react-fittext';

import { CSSTransition } from 'Component';
import { cssUnit } from 'Helper';

import { component } from 'content/resources';

import { maxsize } from './style';

type Props = {
  className?: string,
  iconOnly?: Boolean,
  show?: Boolean,
  message?: String
};

const {
  spinner: {
    content: {
      default: { message }
    }
  }
} = component;

const Spinner = ({ className, iconOnly, show, message }: Props) => {
  const classNames = classnames(
    'spinner',
    { 'is-icon-only': iconOnly },
    className
  );

  return (
    <CSSTransition transitionIn={show} transitionStyle="fade">
      <Fittext maxFontSize={cssUnit(maxsize)}>
        <div className={classNames} aria-label={message}>
          <div>
            <IcoMoon icon="spinner8" />
            <IcoMoon icon="spinner8" />
          </div>
          {message && <p className="text">{message}</p>}
        </div>
      </Fittext>
    </CSSTransition>
  );
};

Spinner.defaultProps = {
  className: '',
  iconOnly: false,
  show: true,
  message
};

export default Spinner;
