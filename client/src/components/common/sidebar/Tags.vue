<template>
  <div class="sidebar">
    <div class="sidebar-contain">

    </div>
  </div>
</template>

<script>
  export default {
    components: {
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
  .sidebar
    -webkit-box-flex 1
    -ms-flex 1 1 33.4%
    flex 1 1 33.4%
    padding-left 21.333px
    padding-left 2rem
</style>
