const m = require("mithril");

let result = null;

// making request on example API
m.request({
  method: "GET",
  url: "/api/test",
})
.then((data) => {
  result = data;
});

function getResult() {
  return result;
}

exports.getResult = getResult;
