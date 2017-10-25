<template>
    <div class="sidebar">
      <div class="sidebar-contain">
        <tags></tags>
      </div>
    </div>
</template>

<script>
  import Tags from './Tags.vue'
  export default {
    components: {
      Tags
    },
    data () {
      return {
        article: {}
      }
    },
    beforeRouteEnter (to, from, next) {
    },
    mounted () {
      this.$nextTick(function () {
      })
    },
    methods: {
    }
  }
</script>

<style lang="stylus">
  @import "../../../stylus/_settings.styl"
  .sidebar
    padding 1em 0 2em
    border-bottom 1px solid $border
    -webkit-box-flex 1
    -ms-flex 1 1 26.4%
    flex 1 1 26.4%
    padding-left 21.333px
    padding-left 1.5rem
    .sidebar-box
      margin-bottom 32px
      margin-bottom 2rem
      background-color hsla(0,0%,100%,.6)
</style>
