const { DateTime } = require('luxon');
const slugify = require("slugify");
const CleanCSS = require('clean-css');
const markdownIt = require('markdown-it');

// Transforms
const htmlMinTransform = require('./src/transforms/html-min-transform.js');

// Create production flag
const isProduction = process.env.NODE_ENV === 'production';

module.exports = config => {

  // Date filters
  config.addFilter('longDate', dateObj => {
    return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat('LLLL dd, yyyy');
  });

  config.addFilter('w3Date', dateObj => {
    return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toISO();
  });

  // Limit amount of posts displayed
  config.addFilter('limit', function (arr, limit) {
    return arr.slice(0, limit);
  });

  // Minify
  config.addFilter('cssmin', function(code) {
    return new CleanCSS({}).minify(code).styles;
  });

  if (isProduction) {
    config.addTransform('htmlmin', htmlMinTransform);
  }

  // Set directories to pass through to the public folder
  config.addPassthroughCopy('./src/img/');
  config.addPassthroughCopy('./src/fonts/');

  // Cleanup urls
  config.addFilter("slug", (input) => {
    const options = {
      replacement: "-",
      remove: /[&,.+()$~%'":*?<>{}]/g,
      lower: true
    };
    return slugify(input, options);
  });

  // Collections
  config.addCollection('exhibitions', collection => {
    return [...collection.getFilteredByGlob('./src/exhibitions/*.md')];
  });

  // Markdown options
  const markdownOptions = {
    html: true,
    breaks: false,
    linkify: true,
    typographer: true,
  };

  config.setLibrary('md', markdownIt(markdownOptions));

  return {
    markdownTemplateEngine: 'njk',
    dataTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
    dir: {
      input: 'src',
      output: 'public'
    }
  };
};
