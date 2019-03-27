import { debounce } from 'Helper';

import duration from './duration';

const addEndListener = async (node, done) => {
  await debounce(duration(node) + 100);

  done();
};

export default addEndListener;
