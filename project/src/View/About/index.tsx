import resources from '$/resources';
import {Asynchronizer} from "@/Component";
import {Route} from '@/Component/Router';
import React from 'react';
import IAbout from './spec';
import './Style';

const {view: {about: {path}}} = resources;

const Works: React.FunctionComponent<IAbout.Props> = ({
  history
}) => (
  <main data-routes='about'>
    <Asynchronizer awaitFor={`${process.env.API_URL}/api/about`}>
      {
        (data: any) => {
          console.log(data.sections);
          return (
            <article>
              <button onClick={history.goBack}>Go Back</button>
              <h1>About</h1>
            </article>
          );
        }
      }
    </Asynchronizer>
  </main>
);

export {path};
export default <Route path={path} render={Works} />;
