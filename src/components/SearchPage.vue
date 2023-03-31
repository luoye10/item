<template>
  <div class="container">
    <div class="head">
      <div class="box">
        <el-input
          v-model="word"
          placeholder="大家都在搜 林俊杰"
          @keyup.enter.native="startSearch"
        >
        </el-input>
        <el-button @click="startSearch">搜索</el-button>
      </div>
    </div>
    <song-page :songs="songs" v-show="isShow"></song-page>
  </div>
</template>

<script>
import { search } from '../api/index';
import SongPage from './SongPage.vue';
export default {
  components: {
    SongPage,
  },
  data() {
    return {
      word: '',
      songs: [],
      isShow: false,
    };
  },
  methods: {
    startSearch() {
      search(this.word)
        .then((res) => {
          this.songs = res.data.result.songs;
          this.isShow = true;
          this.songs.forEach((item) => {
            item.duration = this.format(item.duration);
          });
          console.log(this.songs);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    format(time) {
      let m = Math.floor(time / 60000),
        s = Math.floor((time % 60000) / 1000);
      m = m < 10 ? '0' + m : m;
      s = s < 10 ? '0' + s : s;
      return m + ':' + s;
    },
  },
};
</script>

<style lang="less" scoped>
.head {
  height: 80px;
  background: aqua;
  display: flex;
  justify-content: center;
  align-items: center;
  .box {
    display: flex;
  }
  /deep/.el-input__inner {
    width: 500px;
    height: 30px;
    background: rgba(98, 184, 184, 0.753);
    color: white;
    border: 1px solid rgba(98, 184, 184, 0.753);
    border-radius: 20px;
    padding: 10px;
  }
  /deep/.el-button--default {
    width: 80px;
    height: 30px;
    border: 1px solid rgba(98, 184, 184, 0.753);
    border-radius: 20px;
    background: rgba(98, 184, 184, 0.753);
    color: white;
    cursor: pointer;
    margin-left: 10px;
  }
}
</style>
