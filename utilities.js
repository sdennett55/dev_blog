const fs = require('fs');

function injectContent(filepath, { header, body }) {
  console.log('wtf', filepath, header, body)
  const template = fs.readFileSync(filepath, 'utf8');
  return template
    .replace('{{body_content_do_not_remove}}', body)
    .replace('{{header_content_do_not_remove}}', header);
}

module.exports = { injectContent };