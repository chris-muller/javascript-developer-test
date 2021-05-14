const { httpGet } = require('./mock-http-interface');

// give `body` a default value, as
// `undefined` could unset the object property
const parseResponse = ({status, body} = {}) => {
  const { message } = JSON.parse(body)

  if(status === 200) {
    return { "Arnie Quote": message}
  }

  return { "FAILURE": message }
}

// `Promise.allSettled` works in all modern browsers and
// requires Node v12.9.0 to work in tests. If I had more
// strict browser/node requirements, I'd instead import an
// npm package like `q` that has a comparable method
const getArnieQuotes = (urls = []) => {
  return Promise.allSettled(urls.map(url => httpGet(url)))
    .then(results => results.map(result => result.value))
    .then(results => results.map(parseResponse));
};

module.exports = {
  getArnieQuotes,
};
