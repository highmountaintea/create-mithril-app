import m from 'mithril';

let result = null;

// making request on example API
m.request({
  method: 'GET',
  url: MITHRIL_SERVER_URL + '/api/test',
})
.then((data) => {
  result = data;
});

export function getResult() {
  return result;
}
