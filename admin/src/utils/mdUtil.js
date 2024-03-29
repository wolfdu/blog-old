/**
 * Created by wolfdu on 17-12-31 上午9:55.
 * @author wolfdu
 * @version 2.0
 */

'use strict'
import marked from 'marked'
import hljs from 'highlight.js/lib/highlight'

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

let renderer = new marked.Renderer()

renderer.link = function (href, title, text) {
  return `<a href="${href}" target="_blank">${text}</a>`
}

renderer.image = function(href, title, text) {
  function getImgWithUrlHtml(textArr) {
    return `<img src=${href} alt=${textArr[2]}><br>
            ${textArr[1]}<a href="${textArr[3]}" target="_blank">${textArr[2]}</a>`
  }
  let reg = /([^]*)\[([^]*)\]\(([^]*)\)/
  let isContainUrl = reg.test(text)
  let imgHtml = `<img src=${href} alt=${text}><br>
                ${text}`
  return `<p style="text-align: center;">
            ${isContainUrl ? getImgWithUrlHtml(text.match(reg)) : imgHtml}
          </p>`
}

marked.setOptions({
  renderer: renderer,
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

export function getSimpleMDConfig(elId) {
  return {
    autoDownloadFontAwesome: false,
    element: document.getElementById(elId),
    previewRender: function(plainText) {
      return marked(plainText) // Returns HTML from a custom parser
    },
    spellChecker: false,
    insertTexts: {
      image: ['![](', ')'],
      link: ['[', ']()'],
      table: [
        '',
        '\n\n| Column 1 | Column 2 | Column 3 |\n| -------- | -------- | -------- |\n| Text     | Text      | Text     |\n\n'
      ]
    },
    showIcons: ['table'],
    tabSize: 4
  }
}
