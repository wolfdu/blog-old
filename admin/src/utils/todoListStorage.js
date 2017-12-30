'use strict'

const STORAGE_KEY = 'todos-vuejs'

const todoStorage = {
  fetch: function() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
  },
  save: function(todos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  }
}

export default todoStorage
