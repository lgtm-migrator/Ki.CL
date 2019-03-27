// @flow
import { isEmpty } from 'Helper';

const { API_URL } = process.env;

const promises = new Map();
const caches = new Map();

const request = async ({ path }) => {
  try {
    if (caches.has(path)) {
      return caches.get(path);
    }

    if (!promises.has(path)) {
      const headers = new Headers();

      headers.append('Content-Type', 'application/json');
      headers.append('Accept', 'application/json');

      promises.set(path, fetch(`${API_URL}/api${path}`, {
        mode: 'cors',
        credentials: 'include',
        method: 'GET',
        headers,
      }).then(data => data.json()));
    }

    const data = await promises.get(path);

    caches.set(path, data);

    promises.delete(path);

    return data;
  } catch (error) {
    throw new Error(error);
  }
};

const image = ({ path }) => {
  if (!isEmpty(caches[path])) {
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

export {
 about, image, works, work, caches,
};
