<template>
  <div class="container">
    <div class="head">
      <div class="search">
        <el-input
          v-model="word"
          size="mini"
          prefix-icon="el-icon-search"
          @keyup.enter.native="startSearch"
        >
        </el-input>
        <el-button @click="startSearch" type="primary" round size="mini"
          >搜索</el-button
        >
      </div>
    </div>
    <song-page :songs="songs" v-show="isShow"></song-page>
    <lyric-page v-show="isOpen"></lyric-page>
    <play-page @lyricShow="show"></play-page>
  </div>
</template>

<script>
import { search } from '../api/index';
import format from '../util/format';
import LyricPage from './LyricPage.vue';
import PlayPage from './PlayPage.vue';
import SongPage from './SongPage.vue';
export default {
  components: {
    SongPage,
    PlayPage,
    LyricPage,
  },
  data() {
    return {
      word: '',
      songs: [],
      isShow: false,
      isOpen: false,
    };
  },
  methods: {
    startSearch() {
      this.isOpen = false;
      search(this.word)
        .then((res) => {
          this.songs = res.data.result.songs;
          this.isShow = true;
          this.songs.forEach((item) => {
            item.duration = format(item.duration);
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    show(v) {
      if (this.isOpen === false) {
        this.isOpen = v;
        this.isShow = !this.isOpen;
      } else {
        this.isOpen = false;
        this.isShow = true;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.container {
  position: relative;
  height: 100%;
}
.head {
  height: 80px;
  background: #50cdcd59;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  z-index: 10;
  .search {
    display: flex;
  }
  /deep/.el-input__inner {
    background: rgba(98, 184, 184, 0.753);
    color: white;
    border: 1px solid rgba(149, 192, 192, 0.753);
    border-radius: 20px;
    &:focus {
      outline: none;
    }
  }
  /deep/.el-button {
    margin-left: 10px;
  }
}
</style>
