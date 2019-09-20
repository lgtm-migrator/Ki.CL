import resources from '$/resources';
import {CSSTransition, Logo, Navigation} from '@/Component';
import {History} from '@/Component/Router';
import {paths} from '@/View';
import React, {useEffect, useState} from 'react';
import IGlobalHeader from './spec';
import Style from './Style';
import LocationListener = History.LocationListener;

const history = History.createHashHistory();

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

const transitionInPaths = [paths.home];

const GlobalHeader: React.FunctionComponent<IGlobalHeader.Props> = () => {
  let debounce: number;
  
  const [transitionIn, updateTransitionIn] = useState(false);
  
  const historyChangeHandler: LocationListener = location => {
    debounce = window.requestAnimationFrame(() => {
      updateTransitionIn(
        transitionInPaths.some(path => location.pathname === path)
      )
    });
  };
  
  useEffect(() => {
    history.listen(historyChangeHandler);
    historyChangeHandler(history.location, 'POP');
    
    return () => {
      window.cancelAnimationFrame(debounce);
    }
  }, [transitionIn]);
  
  return (
    <CSSTransition transitionIn={transitionIn}>
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
};

export default GlobalHeader;
