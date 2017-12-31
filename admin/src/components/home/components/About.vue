<template>
  <div class="ovh">
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
  import {getSimpleMDConfig} from '../../../utils/mdUtil'
  import aboutService from '../../../service/about.resource'
  import {mapActions} from 'vuex'

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
          ...getSimpleMDConfig('about-editor'),
          initialValue: this.content
        })
        smde.codemirror.on('change', () => {
          let value = smde.value()
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
        }, res => {
          this.showMsg({content: res.error_message || '获取about失败'})
        })
      })
    },
    methods: {
      ...mapActions([
        'showMsg'
      ]),
      save () {
        aboutService.modify(smde.value()).then(res => {
          if (res.success) {
            this.content = res.data.content
            this.showMsg({content: '保存about成功', type: 'success'})
          }
        }, res => {
          this.showMsg({content: res.error_message || '保存失败'})
        })
      }
    },
    beforeDestroy () {
      smde.toTextArea()
      smde = null
    }
  }
</script>
<style lang="stylus" scoped>
  .ovh
    display grid
    height 100%
    width 100%
  .CodeMirror
    transition border 0.5s
    border-left 1px solid transparent
    overflow-x hidden
    overflow-y auto
    width 100%
  .CodeMirror-sided
    box-sizing border-box
</style>
