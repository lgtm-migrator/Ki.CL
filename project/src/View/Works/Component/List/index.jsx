// @flow
import React, { createRef } from 'react';
import autobind from 'autobind-decorator';

import { cssUnit, randomId } from 'Helper';

import { Navigation } from 'Component';
import { withRouter, Redirect } from 'Component/Router';

import { Item } from 'View/Works/Component';

import resources from 'content/resources';

import State from './State';

import { gap } from './style';

type Props = {
  data?: Array
};

const { cancelAnimationFrame, requestAnimationFrame } = window;

const {
  view: {
    works: { path }
  }
} = resources;

class List extends React.PureComponent<Props> {
  static defaultProps = {
    data: []
  };

  ref = createRef();

  scrollTop = -1;

  componentDidMount() {
    this.scrollMonitor();
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.scrollWatcher);
  }

  @autobind
  setInView() {
    const {
      data,
      location: { pathname },
      updateInView
    } = this.props;

    const space = Math.round(cssUnit(gap));

    const inView = data
      .map(({ id }, index) => {
        const { bottom, height, y } = this.ref.current.childNodes[
          index
        ].getBoundingClientRect();

        const url = `${path}/${id}`;

        const inView = y >= space / 2 && bottom <= space * 2 + height;
        const shouldRedirect = pathname !== url;

        return { inView, shouldRedirect, url };
      })
      .filter(({ inView, shouldRedirect }) => inView && shouldRedirect)[0];

    if (!inView) {
      return;
    }

    updateInView(inView);
  }

  scrollWatcher;

  @autobind
  scrollMonitor() {
    const {
      document: {
        scrollingElement: { scrollTop }
      }
    } = window;

    if (scrollTop !== this.scrollTop) {
      this.scrollTop = scrollTop;
      this.setInView();
    }

    this.scrollWatcher = requestAnimationFrame(this.scrollMonitor);
  }

  render() {
    const {
      data,
      inView: { shouldRedirect, url }
    } = this.props;

    return (
      <React.Fragment>
        <Navigation>
          <ul ref={this.ref}>
            {data.map(project => (
              <Item project={project} key={randomId()} />
            ))}
          </ul>
        </Navigation>
        {shouldRedirect && <Redirect to={url} />}
      </React.Fragment>
    );
  }
}

const Component = State.connecter(List);

export default withRouter(Component);
