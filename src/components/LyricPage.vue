<template>
  <div class="lyrics">
    <div class="item-box" ref="boxEl">
      <ul class="itemList">
        <li
          :class="['item', { active: index === activeIndex }]"
          v-for="(item, index) in lyrics"
          :key="item.massage"
        >
          {{ item.l }}
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import timeHandle from '@/util/time';
import { getLyric } from '../api/index';
export default {
  data() {
    return {
      id: null,
      lyrics: [],
      activeIndex: 0,
      current: '',
    };
  },
  mounted() {
    this.recieve();
    this.highLight();
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
      const arr = [];
      lyricStr.forEach((l) => {
        let timeArr = l.match(reg);
        if (timeArr) {
          timeArr = l.match(reg)[0];
          const time = timeArr.slice(1, 6);
          const lyric = l.replace(reg, '');
          const obj = {
            t: time,
            l: lyric,
          };
          arr.push(obj);
        }
        this.lyrics = arr;
      });
    },
    highLight() {
      this.$bus.$on('current', (v) => {
        const lyrics = this.lyrics;
        const t = timeHandle(v);
        lyrics.forEach((item, index) => {
          const _t = item.t;
          if (_t <= t) {
            this.activeIndex = index;
            this.$refs.boxEl.scrollTop = (this.activeIndex - 7) * 30;
          }
        });
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
      this.$bus.$on('time', (v) => {
        console.log(v);
      });
    },
  },
};
</script>
<style lang="less" scoped>
.lyrics {
  position: absolute;
  left: 0;
  top: 80px;
  right: 0;
  bottom: 80px;
  // background: aqua;
  backdrop-filter: blur(5px);
  .el-icon-arrow-down {
    font-size: 20px;
    margin-left: 30px;
    cursor: pointer;
  }
  .item-box {
    height: 100%;
    width: 500px;
    margin: 0 auto;
    overflow-y: scroll;
    &::-webkit-scrollbar {
      width: 5px;
      border-radius: 5px;
      background: aqua;
    }
    &::-webkit-scrollbar-thumb {
      width: 5px;
      height: 5px;
      border-radius: 5px;
      background: pink;
    }
  }
  .itemList {
    color: white;
    .item {
      height: 20px;
      text-align: center;
      margin: 10px 0;
    }
    .active {
      color: red;
    }
  }
}
</style>
