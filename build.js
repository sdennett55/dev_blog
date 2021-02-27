const showdown = require('showdown');
const createBlogPostTemplate = require('./utilities');
const converter = new showdown.Converter({
  noHeaderId: true,
});
const fs = require('fs');
const fsPromises = require('fs').promises;

fs.readdir('posts', function (err, filenames) {
  if (err) {
    return console.error(`There was an error reading the posts directory`, err);
  }
  filenames.forEach(filename => {
    fs.readFile(`posts/${filename}`, 'utf8', async (err, data) => {
      if (err) {
        return console.error(`There was an issue reading the file: ${filename}`, err);
      }

      const filenameNoExt = filename.split('.')[0];
      const bodyContent = converter.makeHtml(data);

      console.log('before', fs.readdirSync('public'))

      await removeExistingDirsFromPublic();

      console.log('after', fs.readdirSync('public'))

      fs.mkdir(`public/${filenameNoExt}`, err => {
        if (err) {
          return console.error(`There was an error creating the directory for the blogpost ${filenameNoExt}`, err);
        }
        console.log('wtfwtfwtf do somethingggg');
        fs.writeFile(`public/${filenameNoExt}/index.html`, createBlogPostTemplate(bodyContent), err => {
          if (err) {
            console.error(`There was an error writing to ${filenameNoExt}.html`, err);
          }
        })
      });
    });
  });
});

async function removeExistingDirsFromPublic() {
  const promises = [];
  const dirs = await fsPromises.readdir('public');
  
  dirs.forEach(dir => {
    const rmPromise = fsPromises.rmdir(`public/${dir}`, {recursive: true} , err => {
      if (err) {
        return console.error(`There was an error removing ${dir} directory from public`, err);
      }
    });

    promises.push(rmPromise);
  });

  return Promise.all(promises);
}