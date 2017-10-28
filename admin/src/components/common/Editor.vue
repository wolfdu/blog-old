<template>
  <div>
    <h3 class="page-title">关于Wolf Du
      <button
        type="button"
        class="btn btn-save r"
        style="margin-right: 50px;margin-top:-6px"
        @click="save">保存</button></h3>
    <textarea id="about-editor" style="opacity: 0"></textarea>
  </div>
</template>
<script>
  import SimpleMDE from 'simplemde'
  import {marked} from '../../filters/md2Text'
  import aboutService from '../../service/aboutService'

  let smde

  export default{
    data () {
      return {
        content: null
      }
    },
    mounted () {
      this.$nextTick(function () {
        smde = new SimpleMDE({
          initialValue: this.content,
          autoDownloadFontAwesome: false,
          element: document.getElementById('about-editor'),
          previewRender (plainText) {
            return marked(plainText) // Returns HTML from a custom parser
          },
          spellChecker: false
        })
        smde.codemirror.on('change', () => {
          let value = smde.value()
          console.log('aaa')
          if (this.content !== value) {
            this.content = value
          }
        })
        aboutService.getAbout().then(res => {
          if (res.success) {
            this.content = res.data.content
            this.$nextTick(() => {
              smde.value(res.data.content)
            })
          }
        }).catch(err => {
          alert('获取about失败')
          console.log(err)
        })
      })
    },
    beforeDestroy () {
      smde.toTextArea()
      let editor = document.getElementById('editor')
      editor.outerHTML = editor.outerHTML
    },
    methods: {
      save () {
        aboutService.modify(smde.value()).then(res => {
          if (res.success) {
            this.content = res.data.content
            alert('保存成功')
          }
        }).catch(err => {
          console.log(err)
          alert('保存文章内容失败')
        })
      }
    }
  }
</script>
