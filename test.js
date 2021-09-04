const { download } = require('./unpkg');

async function main() {
  // await download('2021-09');
  // await download('required-pm', 'latest');
  // await download('sample-mithril-app', '2021-09');
}

main();

console.log(process.argv);

let [a, b, c, d, ...rest] = [1];
console.log(a, b, c, d, rest);
let [e] = rest;
console.log(e);