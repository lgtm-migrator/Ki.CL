// @flow
import React from 'react';

import { Asynchronizer } from 'Component';
import { Route } from 'Component/Router';

import { work, caches } from 'API';

import resources from 'content/resources';

import Header from './Header';
import Modules from './Modules';

import './style';

type Data = {
  id?: Number
};

type Props = {
  data?: Data
};

const {
  view: {
    works: {
      path: workPath,
      view: {
        work: {
          content: { loader },
          path,
        },
      },
    },
  },
} = resources;

const Work = ({
  data: {
 created_on: createdOn, cover, modules, name,
},
}: Props) => (
  <React.Fragment>
    <Header createdOn={createdOn} cover={cover} modules={modules} name={name} />
    <Modules modules={modules} name={name} />
  </React.Fragment>
);

const Component = ({ match }) => {
  const {
    params: { projectId },
  } = match;

  return (
    <section data-routes={`works.${projectId}`}>
      <Asynchronizer
        awaitCache={caches.get(`${workPath}/${projectId}`)}
        awaitFor={() => work({ projectId })}
        awaitMessage={loader.text}
      >
        {({ data }) => <Work data={data} match={match} />}
      </Asynchronizer>
    </section>
  );
};

Work.defaultProps = {
  data: {},
};

export default <Route path={path} render={Component} />;
