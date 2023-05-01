<template>
  <div class="container">
    <div class="head">
      <div class="search">
        <el-input
          v-model="word"
          size="mini"
          prefix-icon="el-icon-search"
          @keyup.enter.native="startSearch"
          clearable
        >
        </el-input>
        <el-button @click="startSearch" type="primary" round size="mini"
          >搜索</el-button
        >
      </div>
    </div>
    <div class="content" v-show="display">
      <div class="song-sheet">
        <div class="playList">
          <div class="playList-head" @click="spread">
            <span>创建的歌单</span>
            <span>
              <i class="el-icon-caret-bottom" v-if="isSpread"></i>
              <i class="el-icon-caret-right" v-else></i>
            </span>
          </div>
          <div class="add" @click="pop">
            <i class="el-icon-plus"></i>
          </div>
        </div>
        <ul class="sheets" v-show="isSpread">
          <li
            v-for="item in songSheet"
            :class="['sheet', { active: title === item.title }]"
            :key="item.title"
            @click.stop="showList(item.title)"
          >
            <heart-icon v-if="item.isAdd"></heart-icon>
            <div class="name">{{ item.name }}</div>
          </li>
        </ul>
      </div>
      <song-page :songs="songs" v-show="isShow" class="songs"></song-page>
    </div>
    <div class="box" v-show="isPop">
      <div class="star" @click="hide">×</div>
      <div class="title">新建歌单</div>
      <el-input
        v-model="name"
        placeholder="请输入新歌单标题"
        clearable
        class="input"
        @keyup.enter.native="addSheet"
      ></el-input>
      <el-button
        @click="addSheet"
        type="primary"
        round
        size="medium"
        class="button"
        >创建</el-button
      >
    </div>
    <lyric-page v-show="isOpen"></lyric-page>
    <play-page @lyricShow="show"></play-page>
  </div>
</template>

<script>
import HeartIcon from '@/assets/icons/HeartIcon.vue';
import { search } from '../api/index';
import { format } from '../util/time';
import LyricPage from './LyricPage.vue';
import PlayPage from './PlayPage.vue';
import SongPage from './SongPage.vue';
import { getValue, setValue, getListValue, listKey } from '@/util/saveAndGet';
import { randomStr } from '@/util/random';
import { success } from '@/util/message';
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
      isSpread: true,
      songSheet: [],
      name: '',
      isPop: false,
      collectSongs: [],
      collectIds: [],
      obj: {},
      isPrompt: false,
      title: '',
    };
  },
  mounted() {
    this.songSheet = getListValue();
    this.collectSongs = getValue(this.obj.title) || [];
    this.collectIds = this.collectSongs.map((s) => s.id);
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
    spread() {
      this.isSpread = !this.isSpread;
    },
    pop() {
      this.isPop = true;
      this.name = '';
    },
    hide() {
      this.isPop = false;
      this.name = '';
    },
    addSheet() {
      this.obj = {
        title: randomStr(),
        name: this.name,
        isAdd: false,
      };
      if (this.name === '我喜欢的音乐') {
        this.obj.isAdd = true;
      }
      this.isPrompt = !this.name;
      if (!this.name) {
        success('歌单名称不能为空');
        return;
      }
      this.songSheet.push(this.obj);
      setValue(listKey, this.songSheet);
      setValue(this.obj.title, this.collectSongs);
      this.hide();
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
      this.title = name;
      const list = getValue(name);
      this.isShow = true;
      if (list) {
        this.songs = list;
      }
    },
  },
  watch: {
    name() {
      this.isPrompt = false;
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
  background: #50a1f2;
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
    background: #68acf0c2;
    color: white;
    border-color: #68acf0c2;
    border-radius: 20px;
    &:focus {
      outline: none;
    }
  }
  /deep/.el-button--mini {
    margin-left: 10px;
    background: #68acf0c2;
    border-color: #68acf0c2;
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
    .playList {
      height: 30px;
      line-height: 30px;
      padding: 0 20px;
      display: flex;
      justify-content: space-around;
    }
    .playList-head {
      flex: 1;
      cursor: pointer;
    }
    .add {
      width: 20px;
      cursor: pointer;
    }
    .sheet {
      height: 40px;
      padding-left: 20px;
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
  .active {
    background: #ede1e1;
  }
  .songs {
    flex: 1;
  }
}
.box {
  width: 400px;
  height: 200px;
  background: whitesmoke;
  border-radius: 5px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  padding: 0 10px;
  .star {
    font-size: 20px;
    margin-left: 370px;
    cursor: pointer;
  }
  .title {
    height: 50px;
    text-align: center;
    line-height: 50px;
  }
  .prompt {
    color: red;
    margin-top: 10px;
  }
  .button {
    position: absolute;
    left: 50%;
    bottom: 10px;
    transform: translate(-50%, 0);
  }
  .load {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
