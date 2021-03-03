---
title: Create a blazing fast static blog and build system
description: Learn how to create a static site generator for optimal page and developer performance.
publishedDate: 3/2/2021
---

# Create a blazing fast static blog and build system

Recently, I made my very first blog. It's this one actually, **Frontend Performance**! 🎉

It has four 100's on [web.dev/measure](https://web.dev/measure/) and downloads and parses `0kb` of JavaScript.

Before I embarked on my 2-day journey to create my own static build system to generate this blog, I of course considered using an existing blog framework or static site generator.

Those in the React community like myself might be familiar with the frameworks **Gatsby** and **Next.js** as viable options for a blog. They handle server-side rendering out-of-the-box, which is great for SEO as opposed to a classic React SPA.

However, at the end of the day I kept thinking: how interactive do I need my blog to be? Does it really require a beefy frontend framework like React?

I decided to write down what I want out of my blog, which can be summarised to this:

- displays text and images
- loads fast
- accessible
- SEO friendly

It was suddenly very clear Gatsby and Next.js were not options for me because I realized, 

> **"I don't need JavaScript for my static blog."**

Fortunately, there is a cornucopia of static site generators out there which don't generate JavaScript bundles, such as **Hugo**, **Jekyll**, or **11ty**. I hesitated to use one of these though, because they lock you into their way of doing things. I knew this would hurt my developer performance as I would continually end up drowning in their documentation, trying to figure out how they want me to do things.

I eventually decided to just create my own static blog build system that was excessively familiar to me. The process I desired:

- I write the blog posts in Markdown
- A build script watches for changes and compiles them into HTML files
- No webpack configuration
- No unfamiliar templating languages (e.g. liquid)
- Only HTML, CSS, and Markdown files

So that's what I did and below is how you can do it too if you're interested.

First, in a project directory, create two top-level directories `/posts` and `/templates`. The `/posts` directory will contain the markdown files for each blog post and `/templates` will contain HTML templates that are used to build the main `index.html` file and the `[name-of-blog-post].html` file for each blog post. 

Within `/templates` we have two templates: `indexTemplate.html` and `blogPostTemplate.html`. Both templates contain placeholders for dynamic content to be injected via string replace on build. For example, on build of each blog post, we replace the string `{{body_content_do_not_remove}}` within `blogPostTemplate.html` with the blog post Markdown that we'll convert to HTML.

Within `/posts` I create the Markdown file for my first blog post. Our structure looks like this so far:

```
.
├── posts
│   └── my-first-blog-post.md
└── templates
    ├── indexTemplate.html
    └── blogPostTemplate.html
```

Now let's create another top-level directory called `public`. This is where we will build our html files to, as well as serve any fonts and images from.

Using git, let's create a `package.json` file in our project directory with `yarn init -y`.

Now let's install some dev dependcies that we'll need for our build system: `yarn add live-server front-matter nodemon prettier --dev`.

- `live-server` will watch our files for changes and refresh the localhost page.
- `front-matter` will allow us to add information to each Markdown file that we can read and build into our html files, including `title`, `description`, and `publishedDate`
- `nodemon` will be used to watch our Markdown files for changes so it can automatically run the build script.
- `prettier` for consistent code formatting (optional) 

```
.
├── posts
│   └── my-first-blog-post.md
├── public
├── templates
│   ├── indexTemplate.html
│   └── blogPostTemplate.html
└── package.json
```

Great. Now let's create a `build.js` file that we'll run whenever we change a Markdown file in `/posts`.

What `build.js` will do is:

- Read all the Markdown files in `/posts` 
- Get the frontmatter data from each Markdown file and inject that data into the template 
- Use frontmatter `title` and `description` to create the value for the `<title>` and `<meta name="Description">` tags
- Use frontmatter `publishedDate` to inject a `Published by: [date]` text under the title of the blog post
- Write the resulting html to `public/[name-of-blog-post]/index.html`
- For the homepage, add an `<a href="${/name-of-blog-post}">...</a>` containing the `title` and `description` of each blog post, sorted by `publishedDate`
- Write the resulting html to `public/index.html` to create a homepage containing a directory of blog posts, sorted by latest. 

Let's add the scripts we'll need to run to `package.json`

```
"scripts": {
  "watch": "nodemon --watch posts --watch templates build.js",
  "start": "live-server --open=public --ignore=node_modules",
}
```

When working on a blog entry, we'll make sure to run `yarn watch` in a terminal window and `yarn start` in another.

`yarn watch` will watch for changes in the `/posts` and `/templates` directory and re-run the `build.js` script.

`yarn start` will watch for changes in all files except the `node_modules` directory and update the page in the browser.

When we run `yarn watch` for the first time we'll get this:

```
.
├── build.js
├── posts
│   └── my-first-blog-post.md
├── public
│   ├── index.html
│   ├── my-first-blog-post
│   │   └── index.html
│   └── 
├── templates
│   ├── indexTemplate.html
│   └── blogPostTemplate.html
└── package.json
```

<!-- ```
# build.js
# posts
## my-first-blog-post.md
# public
## index.html
## my-first-blog-post
### index.html
## 
# templates
## indexTemplate.html
## blogPostTemplate.html
# package.json
``` -->

And there we have it. The basic structure to our static blog build system. You can check out the code for `build.js` and the other files on [my github](https://github.com/sdennett55/dev_blog) to see the final structure. Keep in mind it needs some refactoring. Also, note that the `/docs` directory in that repo is acting as our `/public` folder.

Thanks for reading!
