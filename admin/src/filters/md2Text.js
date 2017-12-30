/**
 * Created by wolfdu on 17-10-14.
 */
'use strict'

import marked from 'marked'
import hljs from 'highlight.js/lib/highlight'
import trim from 'lodash/trim'

const languages = [
  'cpp',
  'xml',
  'bash',
  'css',
  'md',
  'http',
  'java',
  'js',
  'json',
  'less',
  'makefile',
  'nginx',
  'php',
  'python',
  'scss',
  'sql',
  'stylus'
]
hljs.registerLanguage('cpp', require('highlight.js/lib/languages/cpp'))
hljs.registerLanguage('xml', require('highlight.js/lib/languages/xml'))
hljs.registerLanguage('bash', require('highlight.js/lib/languages/bash'))
hljs.registerLanguage('css', require('highlight.js/lib/languages/css'))
hljs.registerLanguage('md', require('highlight.js/lib/languages/markdown'))
hljs.registerLanguage('http', require('highlight.js/lib/languages/http'))
hljs.registerLanguage('java', require('highlight.js/lib/languages/java'))
hljs.registerLanguage('js', require('highlight.js/lib/languages/javascript'))
hljs.registerLanguage('json', require('highlight.js/lib/languages/json'))
hljs.registerLanguage('less', require('highlight.js/lib/languages/less'))
hljs.registerLanguage(
  'makefile',
  require('highlight.js/lib/languages/makefile')
)
hljs.registerLanguage('nginx', require('highlight.js/lib/languages/nginx'))
hljs.registerLanguage('php', require('highlight.js/lib/languages/php'))
hljs.registerLanguage('python', require('highlight.js/lib/languages/python'))
hljs.registerLanguage('scss', require('highlight.js/lib/languages/scss'))
hljs.registerLanguage('sql', require('highlight.js/lib/languages/sql'))
hljs.registerLanguage('stylus', require('highlight.js/lib/languages/stylus'))
hljs.configure({
  classPrefix: 'hljs-' // don't append class prefix
})

marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  pedantic: false,
  sanitize: false,
  tables: true,
  breaks: true,
  smartLists: true,
  smartypants: true,
  highlight: function(code, lang) {
    if (!~languages.indexOf(lang)) {
      return hljs.highlightAuto(code).value
    }
    return hljs.highlight(lang, code).value
  }
})

function md2Text(md) {
  let div = document.createElement('div')
  div.innerHTML = marked(md)
  return trim(div.innerText)
}

export { md2Text, marked }
