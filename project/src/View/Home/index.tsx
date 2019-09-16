import resources from '$/resources';
import {Asynchronizer, Link, Logo} from '@/Component';
// import {Asynchronizer, Link, Logo, Navigation} from '@/Component';
import {Route, withRouter} from '@/Component/Router';
import IHome from '@/View/Home/spec';
import React from 'react';
import './Style';

const {
  view: {
    about: {name, path: to},
    home: {
      path,
      content: {heading}
    }
  }
} = resources;

const Home: React.FunctionComponent<IHome.Props> = () => (
  <Asynchronizer awaitFor={require('../../../asset/image/big.sur.png')}>
    {() => (
      <main data-routes='home'>
        <Logo isSquare={true}/>
        <h2>{heading}</h2>
        <Link to={to}>{name}</Link>
      </main>
    )}
  </Asynchronizer>
);

const Component = withRouter(Home);

export default <Route path={path} exact={true} component={Component}/>;
