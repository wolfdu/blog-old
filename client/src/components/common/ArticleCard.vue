<template>
  <div class="article-card">
    <div class="container">
      <div class="date">
        <div class="detail">
          <span class="date-detail">23</span>
          <span class="date-detail">October</span>
          <span class="date-detail">2017</span>
        </div>
        <div class="author">
          <span><i class="fa fa-meh-o fa-1" aria-hidden="true"></i>WolfDu</span>
        </div>
      </div>
      <div class="content">
        <h2 class="title"><a>blog admin</a></h2>
        <p>人生如寄，似水流年 如河驶流，往而不返 最惧无常，独遭斯疾</p>
        <div class="info">
          <div class="left">
            <span class="tags"><a>nodeJs</a></span>
          </div>
          <div class="right">
              <span class="article-tag">
                <i class="fa fa-eye fa-1" aria-hidden="true"></i>
                <span>400</span>
              </span>
            <span class="article-tag">
                <i class="fa fa-heartbeat fa-1" aria-hidden="true"></i>
                <span>300</span>
              </span>
            <span class="article-tag">
                <i class="fa fa-commenting-o fa-flip-horizontal fa-1" aria-hidden="true"></i>
                <span>200</span>
              </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

</script>

<style lang="stylus">
  .article-card
    width 653px
    height 138px
    display inline-block
    padding 1rem
    margin-bottom 2rem
    background-color hsla(0,0%,100%,.6)
    border 1px solid #ccc
    margin-left 100px
    box-shadow: 0 10px 10px #CCC
    transition all 0.3s ease
    a
      &:hover
        text-decoration underline
    &:hover
      border 1px solid rgba(82, 168, 236, 0.6)
      box-shadow: 0 0 12px rgba(82, 168, 236, 0.6)
    .container
      display -webkit-box
      display -ms-flexbox
      display flex
      .content
        -webkit-box-flex 1
        -ms-flex 1
        flex 1
        padding 0 35px 0 20px
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
            margin-right 10px
        .detail
          padding 0 20px
          border-right 1px solid #ebebeb
          .date-detail
            display block
</style>
