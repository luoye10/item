<template>
  <div class="lyrics">
    <i class="el-icon-arrow-down" @click="hide"></i>
    <ul class="itemList">
      <li
        :class="['item', { active: isAdd }]"
        v-for="item in lyrics"
        :key="item.massage"
      >
        {{ item }}
      </li>
    </ul>
  </div>
</template>
<script>
import { getLyric } from '../api/index';
export default {
  data() {
    return {
      id: null,
      lyrics: [],
      times: [],
      current: '',
      isAdd: false,
    };
  },
  mounted() {
    this.recieve();
  },
  methods: {
    songLyric() {
      getLyric(this.id)
        .then((res) => {
          const list = res.data.lrc.lyric;
          this.convertLyric(list);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    convertLyric(item) {
      const lyricStr = item.split('\n');
      const reg = /\[\d{2}:\d{2}\.\d{2,}\]/;
      lyricStr.forEach((l) => {
        let timeArr = l.match(reg);
        if (timeArr) {
          timeArr = l.match(reg)[0];
        }
        let time = timeArr.slice(1, 6);
        this.times.push(time);
        let lyric = l.replace(reg, '');
        this.lyrics.push(lyric);
      });
    },
    hide() {
      this.$emit('lyricHide', false);
    },
    recieve() {
      this.$bus.$on('lyric', (v) => {
        this.id = v;
        this.songLyric();
      });
    },
  },
};
</script>
<style lang="less" scoped>
.lyrics {
  position: absolute;
  left: 0;
  top: 100px;
  right: 0;
  bottom: 0;
  background: aqua;
  .el-icon-arrow-down {
    font-size: 20px;
    margin-left: 30px;
    cursor: pointer;
  }
  .itemList {
    width: 500px;
    height: 400px;
    border-radius: 5px;
    background: #adf;
    color: white;
    overflow-y: scroll;
    position: absolute;
    left: 50%;
    top: 0;
    transform: translate(-50%, 0);
    .item {
      height: 20px;
      text-align: center;
      margin: 10px 0;
    }
    &::-webkit-scrollbar {
      width: 10px;
      border-radius: 5px;
      background: aqua;
    }
    &::-webkit-scrollbar-thumb {
      width: 10px;
      height: 10px;
      border-radius: 5px;
      background: pink;
    }
    .active {
      color: red;
    }
  }
}
</style>
