<template>
    <div class="dashboard-contain">
      <div class="main">
        <div class="item grid-header">
          <h3>DashBoard</h3>
        </div>
        <div class="item other">
          <a class="card">
            <div class="thumb"></div>
            <article> <h1>Something todo ...</h1>
              <span>thinking about</span> </article>
          </a>
        </div>
        <div class="item to-do-list">
          <todo-list></todo-list>
        </div>
        <div class="item link">
          <a class="card">
            <div class="thumb"></div>
            <article> <h1>Link???</h1>
              <span>waiting...</span> </article>
          </a>
        </div>
      </div>
    </div>
</template>

<script>
  import TodoList from './common/TodoList.vue'

  export default {
    components: {
      TodoList
    },
    data () {
      return {
      }
    }
  }
</script>

<style lang="stylus" scoped="">
  .dashboard-contain
    box-sizing border-box
    margin 10px
    .main
      height 100%
      width 100%
      display grid
      grid-template-columns 1fr 1fr 1fr
      grid-gap 1rem
    .item
      // background lightsalmon
    .grid-header
      grid-column 1/4
      height 60px
      h3
        margin-left 10px
    .other
      grid-column 2/4
      grid-row 2/4
    .to-do-list
      align-items stretch
    .link
      height 300px
  .card
    background white
    text-decoration none
    color #444
    box-shadow 0 2px 5px rgba(0,0,0,0.1)
    display flex
    flex-direction column
    min-height 100%
    border 1px solid #ccc

  .card article
    padding 20px
  /* typography */
  .card h1
    font-size 20px
    margin 0
    color #333
  .card p
    line-height 1.4
  .card span
    font-size 12px
    font-weight bold
    color #999
    text-transform uppercase
    letter-spacing .05em
    margin 2em 0 0 0
</style>
