import transitionDuration from 'get-transition-duration';

import { classname } from 'Component/CSSTransition/style';

const duration = (node) => {
  const parent = node && node.parentNode;

  if (!parent) {
    return 0;
  }

  const nodes = []
    .concat(...parent.querySelectorAll(`.${classname}`), ...node.childNodes)
    .filter(node => node instanceof HTMLElement);

  return Math.max(...nodes.map(n => transitionDuration(n, true)));
};

export default duration;
