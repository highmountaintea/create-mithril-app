const m = require('mithril');

let result = null;

// making request on example API
m.request({
  method: 'GET',
  url: 'http://localhost:3750/api/test',
})
.then((data) => {
  result = data;
});

function getResult() {
  return result;
}

exports.getResult = getResult;
