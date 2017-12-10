/**
 * Created by wolfdu on 17-12-9.
 */
'use strict'

export function getGitmentInfo () {
  const myTheme = {
    render (state, instance) {
      const container = document.createElement('div')
      container.lang = 'en-US'
      container.className = 'gitment-container gitment-root-container'

      // your custom component
      container.appendChild(instance.renderSomething(state, instance))

      container.appendChild(instance.renderEditor(state, instance))
      container.appendChild(instance.renderComments(state, instance))
      return container
    },
    renderSomething (state, instance) {
      const container = document.createElement('div')
      container.lang = 'en-US'
      if (state.user.login) {
        container.innerText = `Hello, ${state.user.login}`
      }
      return container
    }
  }

  return {
    owner: 'wolfdu',
    repo: 'blog-gitment',
    oauth: {
      client_id: 'd09d01b5172896d0b7ee',
      client_secret: '41d4e5bee172016fe3fe5c8c75ce48651349558a'
    },
    theme: myTheme
  }
}
