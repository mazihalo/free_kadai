const fs = require('node:fs');
const { marked } = require('marked');

exports.readMarkdownFileSync = (filepath) => {
  const markdownStr = fs.readFileSync(
    filepath,
    { encoding: 'utf-8' }
  );
  return markdownStr
}

exports.writeHtml = (markdownStr, outPath) => {
  // markdown文字列をhtmlに変換
  const html = marked.parse(markdownStr);
  fs.writeFileSync(outPath, html);
}
