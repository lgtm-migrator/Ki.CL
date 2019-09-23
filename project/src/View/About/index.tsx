import resources from '$/resources';
import {Asynchronizer, CloseButton, Logo, Navigation} from '@/Component';
import {TransitionStyle} from "@/Component/CSSTransition";
import {Route} from '@/Component/Router';
import IHome from "@/View/Home/spec";
import React from 'react';
import IAbout from './spec';
import './Style';

const {
  view: {
    about: {path, content: { action, heading }}
  }
} = resources;

const api = `${process.env.API_URL}/api/about`;

const Abort: React.FunctionComponent<IHome.Props> = ({
  history
}) => (
  <main data-routes='about'>
    <Asynchronizer awaitFor={api} transitionStyle={TransitionStyle.name.slideDown}>
      {
        (data: IAbout.Data) => (
          <article>
            <Logo/>
            <h2>{heading}</h2>
            <p>{data.sections.About}</p>
            <CloseButton onExit={history.goBack}/>
            <Navigation
              inline={true}
              items={[
                {children: action.name, to: action.path}
              ]}
            />
          </article>
        )
      }
    </Asynchronizer>
  </main>
);

export {path};
export default <Route path={path} render={Abort} />;
