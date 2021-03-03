const showdown = require('showdown');
const showdownHighlight = require("showdown-highlight");
const {injectContent, formatDate} = require('./utilities');
const converter = new showdown.Converter({
  noHeaderId: true,
  extensions: [showdownHighlight],
  openLinksInNewWindow: true,
});
const fs = require('fs');
const fm = require('front-matter');
const fsPromises = require('fs').promises;

function markdownToHTML() {
  fs.readdir('posts', function (err, filenames) {
    if (err) {
      return console.error(`There was an error reading the posts directory`, err);
    }

    filenames.forEach(filename => {
      fs.readFile(`posts/${filename}`, 'utf8', async (err, data) => {
        const { body, attributes: {title, description, publishedDate} } = fm(data);

        if (err) {
          return console.error(`There was an issue reading the file: ${filename}`, err);
        }

        const filenameNoExt = filename.split('.')[0];
        const bodyContent = converter.makeHtml(body).replace(`</h1>`, `</h1><p><em>Published on ${formatDate(publishedDate)}.</em></p>`);

        const header = await fsPromises.readFile('templates/headerTemplate.html', 'utf8');

        const meta = `
          <title>${title}</title>
          <meta name="Description" content="${description}">
          <meta property="og:title" content="${title}">
          <meta property="og:description" content="${description}">
          <meta property="og:url" content="https://frontendperformance.tech/${filenameNoExt}">
        `;

        await removeExistingDirsFromPublic();

        fs.mkdir(`docs/${filenameNoExt}`, err => {
          if (err) {
            return console.error(`There was an error creating the directory for the blogpost ${filenameNoExt}`, err);
          }

          fs.writeFile(`docs/${filenameNoExt}/index.html`, injectContent('templates/blogPostTemplate.html', {body: bodyContent, header, meta}), err => {
            if (err) {
              console.error(`There was an error writing to ${filenameNoExt}.html`, err);
            }
          })
        });
      });
    });
  });
}

async function removeExistingDirsFromPublic() {
  const promises = [];
  const dirs = await fsPromises.readdir('docs');

  dirs.forEach(dir => {
    if (dir === 'assets' || dir === 'site.webmanifest' || dir === '_headers') {
      return;
    }
    const rmPromise = fsPromises.rmdir(`docs/${dir}`, { recursive: true }, err => {
      if (err) {
        return console.error(`There was an error removing ${dir} directory from docs`, err);
      }
    });

    promises.push(rmPromise);
  });

  return Promise.all(promises);
}

async function init() {
  markdownToHTML();

  // get last X blog posts by release date
  const data = await fsPromises.readFile('vanillaConfig.json', 'utf8');
  const numOfBlogPosts = JSON.parse(data).blogPostsOnMainPage;

  // get last numOfBlogPosts including: title, description, thumbnail of each based on posted date.
  const posts = await fsPromises.readdir('posts');

  const sortedPosts = await getFrontMatterData(posts);

  const sortedPostsData = Object.entries(sortedPosts).sort((a, b) => {
    return new Date(a[0]) < new Date(b[0]) ? 1 : -1;
  }).slice(0, numOfBlogPosts).map(x => x[1]);



  const body = Object.values(sortedPostsData).map(({ title, description, filename }) => {
    const path = process.env.SITE_ENV === 'production' ? `/${filename}` : `/docs/${filename}`
    return `
      <li>
        <a href="${path}">
        <h2>${title}</h2>
        <p>${description}</p>
        </a>
      </li>
    `;
  }).join('');

  const header = await fsPromises.readFile('templates/headerTemplate.html', 'utf8');

  // Add content to main index.html file
  fs.writeFile(`docs/index.html`, injectContent('templates/indexTemplate.html', {body, header}), err => {
    if (err) {
      console.error(`There was an error writing to ${filenameNoExt}.html`, err);
    }
  });
}

init();

function getFrontMatterData(posts) {
  return new Promise(async (resolve, reject) => {
    const sortedPosts = {};
    const promises = [];

    for (const post of posts) {
      const promise = await fsPromises.readFile(`posts/${post}`, 'utf8');
      promises.push({ filename: post.split('.md')[0], data: promise });
    }

    await Promise.all(promises);

    for (const {data, filename} of promises) {
      const content = data;

      const { attributes: { publishedDate, title, description } } = fm(content);
      sortedPosts[publishedDate] = { title, description, filename };
    }
    
    resolve(sortedPosts);
  })
}