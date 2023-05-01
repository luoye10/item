<template>
  <div class="comment-box">
    <div class="hot-comment" v-if="isShow">
      <div class="total">{{ `全部评论(${totalComment})` }}</div>
      <ul class="itemList">
        <li class="item" v-for="item in hotComments" :key="item.time">
          <img :src="item.url" class="img" />
          <div class="text">
            <div class="comment">
              <span class="name">{{ item.name + ' :' }}</span>
              <span class="content">{{ item.text }}</span>
            </div>
            <div class="time-like">
              <div class="time">{{ item.tm }}</div>
              <div class="like">
                <thumb-icon></thumb-icon>
                <div class="count">
                  {{ item.likedCount > 0 ? item.likedCount : '' }}
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="commnets">
      <div class="total">{{ `最新评论(${totalComment})` }}</div>
      <ul class="itemList">
        <li class="item" v-for="item in comments" :key="item.time">
          <img :src="item.url" class="img" />
          <div class="text">
            <div class="comment">
              <span class="name">{{ item.name + ' :' }}</span>
              <span class="content">{{ item.text }}</span>
            </div>
            <div class="time-like">
              <div class="time">{{ item.tm }}</div>
              <div class="like">
                <thumb-icon></thumb-icon>
                <div class="count">
                  {{ item.likedCount > 0 ? item.likedCount : '' }}
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
      <div class="page-box">
        <el-pagination
          background
          layout="prev, pager, next"
          :page-size="limit"
          :total="totalComment"
          @current-change="pageChange"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import { getComment } from '@/api/index';
import { formatTime } from '@/util/time';
import ThumbIcon from '@/assets/icons/ThumbIcon.vue';

export default {
  components: { ThumbIcon },
  data() {
    return {
      limit: 20,
      id: null,
      comments: [],
      totalComment: 0,
      page: 1,
      hotComments: [],
      isShow: true,
    };
  },
  mounted() {
    this.songComment();
  },
  methods: {
    songComment() {
      this.$bus.$on('comment', (v) => {
        this.id = v;
        this.getSongComment();
      });
    },
    getSongComment() {
      const params = {
        id: this.id,
        limit: this.limit,
        offset: (this.page - 1) * this.limit,
      };
      getComment(params)
        .then((res) => {
          this.totalComment = res.data.total;
          let comments = res.data.comments;
          let list = comments.map((item) => {
            item.url = item.user.avatarUrl;
            item.name = item.user.nickname;
            item.text = item.content;
            item.tm = formatTime(item.time);
            item.like = item.likedCount;
            return item;
          });
          this.comments = list;
          this.hotComments = res.data.hotComments.map((item) => {
            return {
              url: item.user.avatarUrl,
              name: item.user.nickname,
              text: item.content,
              tm: formatTime(item.time),
              ...item,
            };
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    pageChange(page) {
      this.page = page;
      if (this.page === 1) {
        this.isShow = true;
      } else {
        this.isShow = false;
      }
      this.getSongComment();
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
    color: #fff;
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
    flex: 1;
    .name {
      margin-right: 10px;
      color: blue;
      cursor: pointer;
    }
    .time-like {
      display: flex;
      justify-content: space-between;
      margin: 10px 0;
    }
    .like {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .page-box {
    text-align: center;
    margin: 30px 0;
  }
}
</style>
