<template>
  <div class="post-list">
    <article v-for="post in posts">
      <header>
        <h2><a v-link="'/posts/'+post['_id']">{{post['title']}}</a></h2>
        <h4>
          {{post['createTime']}}
        </h4>
      </header>

      <p v-html="post['excerpt'] | markdown">

      </p>

      <footer>
        <a v-link="'/posts/'+post['_id']">... continue reading</a>
      </footer>

    </article>
    <div class="guide-links fix">
      <span v-if="curPage > 1">← <a href="javascript:;" @click="prevPage()">上一页</a></span>
      <span class="r" v-if="totalPage && (curPage < totalPage)"><a href="javascript:;" @click="nextPage()">下一页</a> →</span>
    </div>
  </div>

</template>
<script>
  export default {
  }
</script>

