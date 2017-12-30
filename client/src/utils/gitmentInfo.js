/**
 * Created by wolfdu on 17-12-9.
 */
'use strict'

export function getGitmentInfo() {
  const myTheme = {
    render(state, instance) {
      const container = document.createElement('div')
      container.lang = 'en-US'
      container.className = 'gitment-container gitment-root-container'

      // your custom component
      container.appendChild(instance.renderSomething(state, instance))

      container.appendChild(instance.renderEditor(state, instance))
      container.appendChild(instance.renderComments(state, instance))
      return container
    },
    renderSomething(state, instance) {
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
      client_id: '9e43702aa84891d10b3c',
      client_secret: '070aeb7215dcc46830f6e1faf30a8ffec4971f5a'
    },
    theme: myTheme
  }
}
