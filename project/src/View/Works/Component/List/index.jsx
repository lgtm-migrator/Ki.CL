// @flow
import React, { createRef } from 'react';
import autobind from 'autobind-decorator';

import { cssUnit, randomId } from 'Helper';

import { Navigation } from 'Component';
import { withRouter } from 'Component/Router';

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
      location: { pathname }
    } = this.props;

    const space = Math.round(cssUnit(gap));

    const inView = data
      .map(({ id }, index) => {
        const { bottom, height, y } = this.ref.current.childNodes[
          index
        ].getBoundingClientRect();

        const url = `${path}/${id}`;

        return {
          inView: y >= space / 2 && bottom <= space * 2 + height,
          shouldRedirect: pathname !== url,
          path: url
        };
      })
      .filter(({ inView, shouldRedirect }) => inView && shouldRedirect)[0];

    console.log(inView);
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
    const { data } = this.props;

    return (
      <Navigation>
        <ul ref={this.ref}>
          {data.map(project => (
            <Item project={project} key={randomId()} />
          ))}
        </ul>
      </Navigation>
    );
  }
}

const Component = State.connector(List);

export default withRouter(Component);
