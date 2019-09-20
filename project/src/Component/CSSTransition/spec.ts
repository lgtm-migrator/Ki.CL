import {CSSTransitionProps} from 'react-transition-group/CSSTransition';
import {EndHandler, EnterHandler, ExitHandler} from 'react-transition-group/Transition';
import ITransitionStyle from './Style/TransitionStyle/spec';

declare module ICSSTransition {
  interface ClassNames extends IClassNames {
    cssTransition: string;
    appear: string;
    appearActive: string;
    appearDone: string;
    enter: string;
    enterActive: string;
    enterDone: string;
    exit: string;
    exitActive: string;
    exitDone: string;
  }
  
  type OnEnter = EnterHandler;
  type OnExit = ExitHandler;
  
  type TransitionInFunction = () => boolean;
  type TransitionInValue = boolean;
  type TransitionIn = TransitionInFunction | TransitionInValue;
  
  type TransitionStyleFunction = () => ITransitionStyle.Key;
  type TransitionStyle = TransitionStyleFunction | ITransitionStyle.Key;
  
  interface Props extends Partial<CSSTransitionProps> {
    addEndListener?: EndHandler;
    onEnter?: EnterHandler;
    onEntering?: EnterHandler;
    onEntered?: EnterHandler;
    onExit?: ExitHandler;
    onExiting?: ExitHandler;
    onExited?: ExitHandler;
    transitionIn?: TransitionIn;
    transitionKey?: string;
    transitionStyle?: TransitionStyle;
  }
}

export default ICSSTransition;
