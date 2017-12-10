<template>
  <div class="article-card">
    <div class="container">
      <div class="date">
        <div class="detail">
          <span class="date-detail">{{dateDetail.date}}</span>
          <span class="date-detail">{{dateDetail.month}}</span>
          <span class="date-detail">{{dateDetail.year}}</span>
        </div>
        <div class="author">
          <span class="author-brand"><i class="fa fa-meh-o fa-1" aria-hidden="true"></i>WolfDu</span>
        </div>
      </div>
      <div class="card-content">
        <h2 class="title"><router-link :to="{name: 'post', query: {postId: article.id}}">{{article.title}}</router-link></h2>
        <p>{{article.excerpt}}</p>
        <div class="info">
          <div class="left">
                <span class="tags" v-for="tag in article.tags">
                  <router-link :to="{name: 'tag', params: {tagId: tag._id, tagName: tag.name}}" class="tag">{{tag.name}}</router-link></span>
          </div>
          <div class="right">
                <span class="article-tag">
                  <i class="fa fa-eye fa-1" aria-hidden="true"></i>
                  <span>{{article.visits}}</span>
                </span>
            <span class="article-tag">
                  <i class="fa fa-heartbeat fa-1" aria-hidden="true"></i>
                  <span>{{article.like}}</span>
                </span>
            <span class="article-tag" v-show="null">
                  <i class="fa fa-commenting-o fa-flip-horizontal fa-1" aria-hidden="true"></i>
                  <span></span>
              </span>
          </div>
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
  .article-card
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
    .container
      display -webkit-box
      display -ms-flexbox
      display flex
      padding 1rem
      .card-content
        -webkit-box-flex 1
        -ms-flex 1
        flex 1
        padding 0 20px 0 20px
        .title
          margin 0
          font-family Raleway
          font-size 20px
          font-style normal
          font-weight 400
          letter-spacing 1px
          text-transform uppercase
          margin-bottom 1rem
          transition all 0.6s ease
          &:hover
            transform translate(15px,0)
        .info
          display -webkit-box
          display -ms-flexbox
          display flex
          -webkit-box-pack justify
          -ms-flex-pack justify
          justify-content space-between
          font-size 14px
          color #222
          margin-top 1rem
          padding-top .5rem
          border-top 1px solid #ebebeb
          span
            margin 0 4px
        .left
          height 2em
          line-height 2rem
          .tags a
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
            margin 0 1px
            margin-bottom 6px
            &:hover
              color rgba(82, 168, 236, 0.6)
              border 1px solid rgba(82, 168, 236, 0.6)
        .right
          height 2em
          line-height 2rem
      .date
        -webkit-box-flex 0
        -ms-flex 0 0 70px
        flex 0 0 70px
        .author
          border-right 1px solid #ebebeb
          margin-top 1rem
          padding-top 2rem
          i
            margin-right 5px
          .author-brand
            color $dark
            font-family $logo-font
            font-weight 500
        .detail
          padding 0 20px
          border-right 1px solid #ebebeb
          .date-detail
            display block
</style>
