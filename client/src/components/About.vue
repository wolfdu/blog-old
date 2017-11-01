<template>
  <div class="post">
    <article class="article">
      <p v-html="content"></p>
    </article>
  </div>
</template>
<script>
  import aboutService from '../service/about.resource'
  import {markdown} from '../filters/markdown'

  export default{
    data () {
      return {
        about: {}
      }
    },
    computed: {
      content: function () {
        return markdown(this.about.content)
      }
    },
    beforeRouteEnter (to, from, next) {
      aboutService.getAbout().then(res => {
        if (res.success) {
          next(vm => {
            vm.about = res.data
          })
        }
      }).catch(err => {
        console.log(err)
        alert('网络错误,请刷新重试')
      })
    }
  }
</script>
