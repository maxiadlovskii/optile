export const readFetch = response =>
  response
    .clone()
    .json()
    .then(
      res => res,
      () => response.text() // fallback if .json fails to process
    );

export const getError = (err, defaultErrorText = 'Something went wrong.') =>
  (err && err.message && err) || defaultErrorText;

export const catchSimpleOrFetchError = (err, defaultErrorText) =>
  (err instanceof window.Response
    ? readFetch(err)
      .then(error => getError(error, defaultErrorText))
      .catch(error => getError(error, defaultErrorText))
    : Promise.resolve(getError(err, defaultErrorText)));
