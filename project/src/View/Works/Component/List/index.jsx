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

  static get space() {
    return Math.round(cssUnit(gap));
  }

  ref = createRef();

  scrollTop = -1;

  componentDidMount() {
    this.scrollInView();
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

    const { current } = this.ref;

    if (!current) {
      return;
    }

    const inView = data
      .map(({ id }, index) => {
        const { bottom, height, y } = current.childNodes[
          index
        ].getBoundingClientRect();

        const belowTop = y >= List.space / 2;
        const aboveBottom = bottom <= List.space * 2 + height;

        const url = `${path}/${id}`;

        const inView = belowTop && aboveBottom;
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

  @autobind
  scrollInView() {
    const {
      data,
      inView: { url }
    } = this.props;

    const { current } = this.ref;

    if (!current) {
      return;
    }

    const { index } = data
      .map(({ id }, index) => ({ id, index }))
      .filter(({ id }) => url.endsWith(id))[0];

    const { top } = current.childNodes[index].getBoundingClientRect();

    document.scrollingElement.scrollTo({
      top: top - List.space,
      behavior: 'auto'
    });
  }

  redirect() {
    const {
      inView: { shouldRedirect, url },
      location: { pathname }
    } = this.props;

    const direct = pathname !== url && shouldRedirect;

    return direct && <Redirect to={url} />;
  }

  render() {
    const { data } = this.props;

    return (
      <React.Fragment>
        <Navigation>
          <ul ref={this.ref}>
            {data.map(project => (
              <Item project={project} key={randomId()} />
            ))}
          </ul>
        </Navigation>
        {this.redirect()}
      </React.Fragment>
    );
  }
}

const Component = State.connecter(List);

export default withRouter(Component);
