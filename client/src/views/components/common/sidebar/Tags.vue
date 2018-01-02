<template>
  <div class="sidebar-box">
    <div class="tags-box">
      <h5 class="title">
        <i class="fa fa-tags fa-2" aria-hidden="true"></i>标签
      </h5>
      <div class="tags">
        <router-link
          v-for="tag in tags"
          :to="{name: 'tag', query: {tagId: tag.id, tagName: tag.name}}"
          :key="tag._id"
          class="tag">{{tag.name}}</router-link>
      </div>
    </div>
  </div>
</template>

<script>
  import tagService from 'src/service/tag.resource'

  export default {
    components: {
    },
    data () {
      return {
        tags: []
      }
    },
    mounted () {
      this.$nextTick(function () {
        tagService.getTags().then(res => {
          if (res.success) {
            this.tags = res.data
          }
        }).catch(err => {
          console.log(err)
          alert('网络错误')
        })
      })
    },
    methods: {
    }
  }
</script>

<style lang="stylus">

  .sidebar-box
    width 100%
    display inline-block
    margin-bottom 2rem
    background-color hsla(0,0%,100%,.6)
    border 1px solid #ccc
    box-shadow: 0 10px 10px #CCC
    transition all 0.3s ease
    &:hover
      border 1px solid rgba(82, 168, 236, 0.6)
      box-shadow: 0 0 12px rgba(82, 168, 236, 0.6)
    .tags-box
      padding .5rem
      h5
        margin 0
        border-bottom .1px solid #ebebeb
        padding-bottom .3rem

  .tags
    margin-bottom -5px
    margin-top .5rem
    .tag
      transition all 0.3s ease
      margin-right 5px
      display inline-block;
      border 1px solid #c4c4c4
      border-radius 999em
      padding 0 10px
      color #bfbfbf
      line-height 24px
      font-size 12px
      text-decoration none
      margin-bottom 6px
      border-color #bfbfbf
      &:hover
        color rgba(82, 168, 236, 0.6)
        border 1px solid rgba(82, 168, 236, 0.6)



</style>
