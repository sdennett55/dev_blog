---
title: SVG Crop
description: A tool to remove blank space from around any SVG instantly.
publishedDate: 3/1/2021
---

# SVG Crop - Remove blank space from around any SVG instantly

Let's start with a standard scenario for web devs. You're working on a web project and need a share icon for users to be able to share your content. You google **"share icon svg"** and choose your favorite icon from one of the many icon libraries out there and copy the SVG code.

You embed the SVG code into your site, but you notice there's some extra space baked into the SVG. Now it's hard to lay it out precisely, since you need to account for this arbitrary amount of space. So now you take one of the following approaches:

- Manually maniupulate the values of the viewBox attribute on the `<svg>`
- Pixel push in CSS using negative margins
- Fire up Illustrator, Inkscape or similar vector graphic software to manually manipulate the canvas

In either case, the process requires some sort of manual effort that kicks off a distracting side quest. If only there was an online tool that crops any SVG for you so you can keep making progress on your project.

Introducing...[SVG Crop!](https://svgcrop.com)

Simply upload the SVG file via the input or drag-and-drop interface and instantly download your newly cropped SVG.

The tool works by finding the dimensions of the SVG contents and manipulating the viewBox of the SVG accordingly. This tool has multiple file support and will download several as a zip file.

That's it! Feel free to [contribute to the project](https://github.com/sdennett55/svg_crop).

