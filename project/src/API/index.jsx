// @flow
import { isEmpty } from 'Helper';

const { API_URL } = process.env;

const promises = {};
const caches = {};

const request = async ({ path }) => {
  try {
    if (!isEmpty(caches[path])) {
      return caches[path];
    }

    if (isEmpty(promises[path])) {
      const headers = new Headers();

      headers.append('Content-Type', 'application/json');
      headers.append('Accept', 'application/json');

      promises[path] = fetch(`${API_URL}/api${path}`, {
        mode: 'cors',
        credentials: 'include',
        method: 'GET',
        headers
      }).then(data => data.json());
    }

    const data = await promises[path];

    caches[path] = data;

    delete promises[path];

    return data;
  } catch (error) {
    throw new Error(error);
  }
};

const image = ({ path }) => {
  if (caches[path]) {
    return caches[path];
  }

  return new Promise((resolve, reject) => {
    const image = new Image();

    image.onload = () => {
      caches[path] = path;

      resolve(path);
    };

    image.onerror = () => {
      reject(new Error(`${path} can not be found`));
    };

    image.src = path;
  });
};

const about = () => request({ path: '/about' });
const works = () => request({ path: '/works' });
const work = ({ projectId }) => request({ path: `/works/${projectId}` });

export { about, image, works, work, caches };
