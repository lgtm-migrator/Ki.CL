'use strict';

import { State } from '@/helper/helper';

import Index from './index/index';
import Me from './me/me';
import Site from './site/site';

import { Navigation } from '@/component/component';

const Route = ReactRouter.Route;
const CSSTransitionGroup = React.addons.CSSTransitionGroup;
const cloneElement = React.cloneElement;

const AboutComponent = React.createClass({
  setStyle(event) {
    this.setState((previousState, currentProps) => {
      return $.extend(true, {}, previousState, {
        style: event.detail.style.main
      });
    });
  },

  componentWillMount() {
    this.state = {};

    window.addEventListener('view.style', this.setStyle, false);
  },

  componentWillUnmount() {
    window.removeEventListener('view.style', this.setStyle, false);
  },

  render() {
    return (
      <section className='about' style={ this.state.style }>
        <h2>About</h2>
        <Navigation list={ [ { name: 'About Me', route: '/about/me' }, { name: 'About site', route: '/about/site' } ] } />
        <CSSTransitionGroup component='section' transitionName='aboutRoute' transitionEnterTimeout={ 500 } transitionLeaveTimeout={ 500 }>
          { cloneElement(this.props.children, {
              key: this.props.location.pathname
            }) }
        </CSSTransitionGroup>
      </section>
    )
  }
})

class About {
  constructor() {
    return <Route path='about' component={ AboutComponent } onEnter={ State.enter } onChange={ State.change } onLeave={ State.leave }>
             { Index }
             { Me }
             { Site }
           </Route>;
  }
}

export default new About();

export { AboutComponent as Component };