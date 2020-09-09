export const isObject = val => {
  if (val === null) {
    return false;
  }

  return typeof val === 'object';
};
export const additionsClasses = (additions = [], style) =>
  additions.reduce((res, addition) => {
    if (isObject(addition)) {
      const classes = Object.entries(addition).reduce((result, [ key, val ]) => (
        val ? [ ...result, style[key] ] : result
      ), []);

      return [ ...res, ...classes ];
    }

    return [ ...res, style[addition] ];
  }, []);

export const getErrors = response => (response && response.data) || {};

export const getCelsiusTemp = K => K - 273.15;
export const getFahrenheitTemp = K => K * 1.8 - 459.67;
