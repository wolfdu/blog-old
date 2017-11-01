<template>
  <div class="hot-article-card">
    <div class="article-info">
      <div class="thumb">
        <img :src="article.thumb">
      </div>
      <div class="card-content">
        <div>
          <h5 class="title"><router-link :to="{name: 'post', query: {postId: article.id}}">{{article.title}}</router-link></h5>
          <span>{{dateDetail}}</span>
        </div>
      </div>
    </div>
  </div>
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
            thumb: 'http://oyf26dx0a.bkt.clouddn.com/test.png-thumb'
          }
        }
      }
    },
    computed: {
      dateDetail: function () {
        let dateDetail = this.getDateDetail(this.article.createTime)
        return `${dateDetail.date}/${dateDetail.month}/${dateDetail.year}`
      }
    },
    methods: {
      getDateDetail (dateStr) {
        let date = new Date(dateStr)
        return {
          date: date.getDate(),
          month: date.toString().substring(4, 7),
          year: date.getFullYear()
        }
      }
    }
  }
</script>

<style lang="stylus">
  @import "../../../stylus/_settings.styl"
  .hot-article-card
    padding .3rem
    .article-info
      display -webkit-box
      display -ms-flexbox
      display flex
      .thumb
        -webkit-box-flex 0
        -ms-flex 0 0 80px
        flex 0 0 80px
      .card-content
        padding 0 16px
        padding 0 .2rem
        .title
          border none
          transition all 0.6s ease
          &:hover
            a
              color $green
            transform translate(10px,0)
</style>
