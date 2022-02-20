---
title: 'Exhibitions'
layout: 'layouts/feed.html'
summary: 'A list of exhibitions...'
pagination:
  data: collections.exhibitions
  size: 10
permalink: 'exhibitions{% if pagination.pageNumber > 0 %}/page/{{ pagination.pageNumber }}{% endif %}/index.html'
paginationPrevText: 'Newer posts'
paginationNextText: 'Older posts'
eleventyExcludeFromCollections: true
---
