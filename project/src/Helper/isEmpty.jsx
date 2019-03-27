const isPromise = data => Boolean(typeof data === 'object' && Boolean(data.then));

const isArray = data => Boolean(Array.isArray(data) && data.length > 0);

const isObject = data => Boolean(
    typeof data === 'object'
      && Object.keys(data).some(name => Object.prototype.hasOwnProperty.call(data, name)),
  );

const isTruthy = data => Boolean(data);

const isEmpty = data => !isPromise(data) && !isArray(data) && !isObject(data) && !isTruthy(data);

export default isEmpty;
