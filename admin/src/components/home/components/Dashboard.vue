<template>
    <div class="dashboard-contain">
      <div class="main">
        <div class="item header"></div>
        <div class="item author"></div>
        <div class="item other"></div>
        <div class="item to-do-list"></div>
        <div class="item link"></div>
      </div>
    </div>
</template>

<script>
  export default {
    components: {
    },
    data () {
      return {
      }
    }
  }
</script>

<style lang="stylus">
  .dashboard-contain
    box-sizing border-box
    box-shadow 0 0 1px rgba(0,0,0,0.25)
    margin 10px
    .main
      height 100%
      width 100%
      display grid
      grid-template-columns 1fr 1fr 1fr
      grid-gap 1rem
    .item
      background lightsalmon
    .header
      grid-column 1/4
      height 100px
    .author
      height 300px
    .other
      grid-column 2/4
      grid-row 2/5
    .to-do-list
      height 300px
    .link
      height 300px
</style>
