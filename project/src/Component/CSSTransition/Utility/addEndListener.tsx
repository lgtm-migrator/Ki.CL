import Style from '@/Component/CSSTransition/Style';
import {CSSUnit} from '@/Helper';
import getTransitionDuration from 'get-transition-duration';
import {EndHandler} from 'react-transition-group/Transition';

const {setTimeout} = window;

const getAnimationDuration = (node: HTMLElement) => (
  CSSUnit(window.getComputedStyle(node).animationDuration) || 0
) + (
  CSSUnit(window.getComputedStyle(node).animationDelay) || 0
);

const duration = (node: HTMLElement) => (
  node && node.parentNode ? (
    Math.max(
      ...[].concat(
        Array.from(
          node.parentNode.querySelectorAll(`.${Style.cssTransition}`)
        ),
        Array.from(
          node.querySelectorAll(`.${Style.cssTransition}`)
        ),
        Array.from(
          node.childNodes
        )
      ).map(
        (elm: HTMLElement) => Math.max(
          getTransitionDuration(elm, true), getAnimationDuration(elm)
        )
      )
    )
  ) : 0
);

const addEndListener: EndHandler = (node, done) => {
  const waitTime = duration(node);
  
  if (waitTime === 0) {
    done();
    return;
  }
  
  setTimeout(done, duration(node));
};

export default addEndListener;
