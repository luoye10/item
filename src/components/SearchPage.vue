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
    <div class="content" v-show="display">
      <div class="song-sheet">
        <ul class="sheets">
          <li
            class="sheet"
            @click="showList('my like')"
            v-for="item in songSheet"
            :key="item.id"
          >
            <heart-icon></heart-icon>
            <div class="name">{{ item.name }}</div>
          </li>
        </ul>
      </div>
      <song-page :songs="songs" v-show="isShow" class="songs"></song-page>
    </div>
    <lyric-page v-show="isOpen"></lyric-page>
    <play-page @lyricShow="show"></play-page>
  </div>
</template>

<script>
import HeartIcon from '@/assets/icons/HeartIcon.vue';
import { search } from '../api/index';
import format from '../util/format';
import LyricPage from './LyricPage.vue';
import PlayPage from './PlayPage.vue';
import SongPage from './SongPage.vue';
import { getValue } from '@/util/saveAndGet';
export default {
  components: {
    SongPage,
    PlayPage,
    LyricPage,
    HeartIcon,
  },
  data() {
    return {
      word: '',
      songs: [],
      isShow: false,
      isOpen: false,
      display: true,
      songSheet: [{ name: '我喜欢的音乐', id: 1325129115 }],
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
        this.display = !this.isOpen;
      } else {
        this.isOpen = false;
        this.display = true;
      }
    },
    showList(name) {
      const list = getValue(name);
      this.isShow = true;
      if (list) {
        this.songs = list;
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
.content {
  width: 100%;
  height: 100%;
  display: flex;
  .song-sheet {
    position: fixed;
    top: 80px;
    left: 0;
    bottom: 80px;
    width: 200px;
    background: white;
    border-right: 2px solid #dadada;
    .sheet {
      height: 40px;
      padding-left: 20px;
      line-height: 40px;
      display: flex;
      align-items: center;
      cursor: pointer;
      &:hover {
        background: #ede1e1;
      }
      .name {
        margin-left: 10px;
      }
    }
  }
  .songs {
    flex: 1;
  }
}
</style>
