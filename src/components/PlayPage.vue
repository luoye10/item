<template>
  <div class="play-box">
    <div class="song">
      <div class="img">
        <img :src="url" />
      </div>
      <div class="text">
        <div class="name">{{ name }}</div>
        <div class="singer">{{ singer }}</div>
      </div>
    </div>
    <div class="test">
      <div class="item">
        <div class="prev" @click="prev">
          <prev-icon></prev-icon>
        </div>
        <div class="play" @click="play">
          <pause-icon v-if="isShow"></pause-icon>
          <play-icon v-else></play-icon>
        </div>
        <div class="next" @click="next">
          <next-icon></next-icon>
        </div>
        <div class="word" @click="show">歌词</div>
      </div>
      <div class="time">
        <div class="current">{{ current }}</div>
        <div class="progress" @click="selectTime" ref="barEl">
          <div class="rate" :style="{ width: width + '%' }"></div>
        </div>
        <div class="end">{{ duration }}</div>
      </div>
    </div>
    <div class="icon">
      <el-dropdown placement="top">
        <div class="open" @click="mute">
          <sound-icon v-if="isOpen"></sound-icon>
          <mute-icon v-else></mute-icon>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-slider
            v-model="value"
            vertical
            height="200px"
            @change="soundChange"
          >
          </el-slider>
        </el-dropdown-menu>
      </el-dropdown>
      <el-dropdown placement="top" @command="playModel">
        <menu-icon></menu-icon>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item
            command="order"
            :class="{ active: currentModel === 'order' }"
            >顺序播放</el-dropdown-item
          >
          <el-dropdown-item
            command="rand"
            :class="{ active: currentModel === 'rand' }"
            >随机播放</el-dropdown-item
          >
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>
<script>
import { timeHandle } from '../util/time';
import SoundIcon from '../assets/icons/SoundIcon.vue';
import MuteIcon from '../assets/icons/MuteIcon.vue';
import PrevIcon from '@/assets/icons/PrevIcon.vue';
import NextIcon from '@/assets/icons/NextIcon.vue';
import PauseIcon from '@/assets/icons/PauseIcon.vue';
import PlayIcon from '@/assets/icons/PlayIcon.vue';
import MenuIcon from '@/assets/icons/MenuIcon.vue';

export default {
  components: {
    SoundIcon,
    MuteIcon,
    PrevIcon,
    NextIcon,
    PauseIcon,
    PlayIcon,
    MenuIcon,
  },
  data() {
    return {
      isShow: true,
      current: '00:00',
      name: '',
      url: '',
      singer: '',
      duration: '',
      width: 0,
      value: Math.floor(Math.random() * 100),
      w: 0,
      isOpen: true,
      currentModel: '',
    };
  },
  mounted() {
    this.receive();
    this.audio = document.getElementsByClassName('player')[0];
    const bar = this.$refs.barEl;
    const w = window.getComputedStyle(bar).width;
    if (w) {
      this.w = parseFloat(w);
    }
    this.end();
  },
  methods: {
    play() {
      if (this.isShow === false) {
        this.isShow = true;
        this.audio.pause();
      } else {
        this.isShow = false;
        this.audio.play();
      }
    },
    mute() {
      if (this.isOpen === true) {
        this.isOpen = false;
        this.audio.muted = true;
        this.value = 0;
      } else {
        this.isOpen = true;
        this.audio.muted = false;
        this.value = this.audio.volume * 100;
      }
    },
    soundChange() {
      this.audio.volume = this.value / 100;
    },
    prev() {
      this.$bus.$emit('change', 'prev', this.currentModel);
    },
    next() {
      this.$bus.$emit('change', 'next', this.currentModel);
    },
    end() {
      this.$bus.$on('end', () => {
        this.next();
      });
    },
    playModel(v) {
      console.log(v);
      this.currentModel = v;
    },
    show() {
      this.$emit('lyricShow', true);
    },
    receive() {
      this.$bus.$on('startPlay', (obj, v) => {
        this.isShow = v;
        this.name = obj.name;
        this.url = obj.artists[0].img1v1Url;
        this.singer = obj.artists[0].name;
        this.duration = obj.duration;
      });
      this.$bus.$on('current', (currentTime) => {
        this.current = timeHandle(currentTime);
        let per = Math.floor((currentTime / this.convert(this.duration)) * 100);
        this.width = per;
      });
      this.$bus.$on('playStop', (v) => {
        this.isShow = v;
      });
    },
    convert(timeStr) {
      let m = Number(timeStr.slice(0, 2)),
        s = Number(timeStr.slice(-2)),
        num = m * 60 + s;
      return num;
    },
    selectTime(e) {
      const x = e.offsetX;
      const per = x / this.w;
      const totalTime = this.convert(this.duration);
      this.audio.currentTime = totalTime * per;
    },
  },
};
</script>
<style lang="less" scoped>
.play-box {
  position: fixed;
  left: 0;
  bottom: 0;
  right: 0;
  height: 80px;
  background: white;
  border-top: 3px solid #ede1e1;
  display: flex;
  .song {
    flex: 2;
    display: flex;
    margin: 15px;
    img {
      display: inline-block;
      width: 50px;
      height: 50px;
      border-radius: 5px;
    }
  }
  .text {
    flex: 1;
    margin-left: 10px;
    margin-top: 5px;
    .singer {
      margin-top: 5px;
      font-size: 14px;
    }
  }
  .test {
    flex: 3;
  }
  .item {
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    .prev,
    .next {
      font-size: 15px;
      cursor: pointer;
    }
    .play {
      font-size: 30px;
      margin: 0 20px;
      cursor: pointer;
    }
    .word {
      margin-left: 20px;
      cursor: pointer;
    }
  }
  .time {
    display: flex;
    justify-content: center;
    .current,
    .end {
      width: 50px;
    }
    .progress {
      flex: 1;
      height: 10px;
      background: #dadada;
      border-radius: 5px;
      margin: 5px;
    }
    .rate {
      height: 10px;
      border-radius: 5px;
      background: rgba(62, 62, 218, 0.792);
    }
  }
  .icon {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    .el-dropdown-selfdefine,
    .el-icon-s-unfold {
      font-size: 20px;
      margin: 5px 10px;
      cursor: pointer;
    }
  }
}
</style>
<style>
.el-dropdown-menu__item.active {
  color: #6cf;
}
</style>
