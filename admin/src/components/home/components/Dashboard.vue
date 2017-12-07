<template>
  <div>
    <h3 class="page-title">疯狂的Dashboard</h3>
    <div class="dashboard-contain">
      <div class="main">
        <div class="item"></div>
        <div class="item"></div>
        <div class="item"></div>
      </div>
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
      display grid
      grid-template-columns 1fr 6fr 1fr
      grid-gap 1rem
    .item
      background lightblue
</style>
