// @flow
import React from 'react';

import moment from 'moment';

import { Image } from 'Component';

import './style';

type Props = {
  createdOn: number,
  cover: string,
  name: string
};

const Header = ({ createdOn, cover, name }: Props) => {
  const time = moment.unix(createdOn);

  return (
    <header className="view-work-header">
      <h1>{name}</h1>
      <Image alt={name} src={cover} />
      <p>
        <time dateTime={time.format('YYYY-MM-DD')}>
          {time.format('Mo, MMMM YYYY')}
        </time>
      </p>
    </header>
  );
};

Header.defaultProps = {};

export default Header;
