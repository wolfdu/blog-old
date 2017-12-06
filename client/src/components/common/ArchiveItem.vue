<template>
  <li>
    <span>{{dateDetail.date}} --
      <h2 class="title"><router-link :to="{name: 'post', query: {postId: article.id}}">{{article.title}}</router-link></h2></span>
  </li>
</template>

<script>
  export default {
    props: {
      article: {
        type: Object,
        default: function () {
          return {
            createTime: '2017-10-20',
            title: 'wolfdu blog',
            excerpt: '人生如寄，似水流年 如河驶流，往而不返 最惧无常，独遭斯疾',
            tags: ['nodeJs', 'JavaScript'],
            comments: ['aa', 'bb'],
            visits: 100,
            like: 50
          }
        }
      }
    },
    computed: {
      dateDetail: function () {
        return this.getDateDetail(this.article.createTime)
      }
    },
    methods: {
      getDateDetail (dateStr) {
        return {
          date: dateStr.substring(0, 10)
        }
      }
    }
  }
</script>

<style lang="stylus" scoped="stylus">
  @import "../../stylus/_settings.styl"
  span
    display -webkit-inline-box
  .title
    margin 0
    font-family Raleway
    font-size 15px
    font-style normal
    font-weight 400
    letter-spacing 1px
    text-transform uppercase
    margin-left .5rem
    margin-bottom .5rem
    transition all 0.6s ease
    &:hover
      transform translate(15px,0)
</style>
