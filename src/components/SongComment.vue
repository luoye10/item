<template>
  <div class="comment-box">
    <div class="total">{{ text + '(' + total + ')' }}</div>
    <ul class="itemList">
      <li class="item" v-for="item in comments" :key="item.massage">
        <img :src="item.user.avatarUrl" class="img" />
        <div class="text">
          <div class="comment">
            <div class="name">{{ item.user.nickname + ' :' }}</div>
            <div class="content">{{ item.content }}</div>
          </div>
          <div class="time">{{ item.timeStr }}</div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import { getComment } from '@/api/index';
export default {
  data() {
    return {
      limit: 20,
      id: null,
      comments: [],
      time: null,
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
            this.comments = res.data.comments;
            this.total = res.data.total;
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
    .comment {
      display: flex;
    }
    .name {
      color: blue;
      cursor: pointer;
    }
    .content {
      margin-left: 10px;
    }
    .time {
      margin: 10px 0;
    }
  }
}
</style>
