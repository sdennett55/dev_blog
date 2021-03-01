const fs = require('fs');

function injectBodyContent(filepath, content) {
  const template = fs.readFileSync(filepath, 'utf8');
  return template.replace('{{body_content_do_not_remove}}', content);
}

module.exports = injectBodyContent;