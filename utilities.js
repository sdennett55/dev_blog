const fs = require('fs');

function createBlogPostTemplate(content) {
  let blogPostSkeleton = fs.readFileSync('blogPostSkeleton.html', 'utf8');
  const result = blogPostSkeleton.replace('<p>bodyContent<p>', content);
  return result;
}

module.exports = createBlogPostTemplate;