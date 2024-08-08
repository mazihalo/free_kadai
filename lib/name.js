// lib/name.js
const path = require('node:path');
const fs = require('node:fs');

const packageStr = fs.readFileSync(
  // package.jsonが1階層上になったので相対パスで一つ上に上がる
  path.resolve(__dirname, '../package.json'),
  { encoding: 'utf-8' }
);
const packageJson = JSON.parse(packageStr);

exports.getPackageName = () => {
  return packageJson.name;
};
