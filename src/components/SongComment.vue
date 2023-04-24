<template>
  <div class="comment-box">
    <div class="total">{{ text + '(' + total + ')' }}</div>
    <ul class="itemList">
      <li class="item" v-for="item in comments" :key="item.time">
        <img :src="item.url" class="img" />
        <div class="text">
          <div class="comment">
            <span class="name">{{ item.name + ' :' }}</span>
            <span class="content">{{ item.text }}</span>
          </div>
          <div class="time">{{ item.tm }}</div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import { getComment } from '@/api/index';
import { formatTime } from '@/util/time';
export default {
  data() {
    return {
      limit: 20,
      id: null,
      comments: [],
      text: '最新评论',
      total: null,
    };
  },
  mounted() {
    this.songComment();
  },
  methods: {
    songComment() {
      this.$bus.$on('comment', (v) => {
        this.id = v;
        const params = {
          id: this.id,
          limit: this.limit,
        };
        getComment(params)
          .then((res) => {
            this.total = res.data.total;
            let comments = res.data.comments;
            let list = comments.map((item) => {
              item.url = item.user.avatarUrl;
              item.name = item.user.nickname;
              item.text = item.content;
              item.tm = formatTime(item.time);
              return item;
            });
            this.comments = list;
          })
          .catch((error) => {
            console.log(error);
          });
      });
    },
  },
};
</script>
<style lang="less" scoped>
.comment-box {
  margin: 50px 40px;
  margin-bottom: 100px;
  .total {
    font-size: 22px;
    font-weight: bold;
    margin-bottom: 10px;
  }
  .item {
    border-bottom: 1px solid #dadada;
    padding: 10px 0;
    display: flex;
    &:last-child {
      border-bottom-color: transparent;
    }
  }
  .img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    cursor: pointer;
  }
  .text {
    margin-left: 30px;
    .name {
      margin-right: 10px;
      color: blue;
      cursor: pointer;
    }
    .time {
      margin: 10px 0;
      color: rgba(41, 40, 40, 0.815);
    }
  }
}
</style>
