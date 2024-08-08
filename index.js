const path = require('node:path');
const { parseArgs } = require('node:util');
const { getPackageName } = require('./lib/name');
const { readMarkdownFileSync, writeHtml } = require('./lib/file');

const { values } = parseArgs({ strict: false });

if (values.name) {
  const name = getPackageName();
  console.log(name);
  return
}

if (values.file) {
  const filePath = path.resolve(__dirname, values.file);
  const markdownStr = readMarkdownFileSync(filePath);
  writeHtml(markdownStr, values.out);
  return
}

console.log('オプションがありません');
