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
          <i class="el-icon-arrow-left"></i>
        </div>
        <div class="play" @click="play">
          <i class="el-icon-video-play" v-if="isShow"></i>
          <i class="el-icon-video-pause" v-else></i>
        </div>
        <div class="next" @click="next">
          <i class="el-icon-arrow-right"></i>
        </div>
        <div class="word" @click="show">歌词</div>
      </div>
      <div class="time">
        <div class="current">{{ current }}</div>
        <div class="progress">
          <div class="rate" :style="{ width: width + '%' }"></div>
        </div>
        <div class="end">{{ duration }}</div>
      </div>
    </div>
    <div class="icon">
      <el-dropdown placement="top">
        <i class="el-icon-bell"></i>
        <el-dropdown-menu slot="dropdown">
          <el-slider v-model="value" vertical height="200px"> </el-slider>
        </el-dropdown-menu>
      </el-dropdown>
      <el-dropdown placement="top">
        <i class="el-icon-s-unfold"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>顺序播放</el-dropdown-item>
          <el-dropdown-item>随机播放</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isShow: true,
      current: '00:00',
      name: '',
      url: '',
      singer: '',
      duration: '',
      width: 0,
      value: 0,
    };
  },
  mounted() {
    this.receive();
    this.audio = document.getElementsByClassName('player')[0];
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
    prev() {},
    next() {},
    show() {},
    receive() {
      this.$bus.$on('startPlay', (obj, v) => {
        this.isShow = v;
        this.name = obj.name;
        this.url = obj.artists[0].img1v1Url;
        this.singer = obj.artists[0].name;
        this.duration = obj.duration;
      });
      this.$bus.$on('send', (currentTime) => {
        this.current = this.timeChange(currentTime);
        let per = Math.floor((currentTime / this.convert(this.duration)) * 100);
        this.width = per;
      });
    },
    timeChange(time) {
      if (time >= 60) {
        let m = Math.floor(time / 60),
          s = time % 60;
        m = m < 10 ? '0' + m : m;
        s = s < 10 ? '0' + s : s;
        time = m + ':' + s;
      } else if (time >= 10 && time < 60) {
        time = '00' + ':' + time;
      } else {
        time = '00' + ':' + '0' + time;
      }
      return time;
    },
    convert(timeStr) {
      let m = Number(timeStr.slice(0, 2)),
        s = Number(timeStr.slice(-2)),
        num = m * 60 + s;
      return num;
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
  background: whitesmoke;
  border-top: 1px solid #dadada;
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
    line-height: 50px;
    .prev,
    .next {
      font-size: 20px;
      cursor: pointer;
    }
    .play {
      font-size: 30px;
      margin: 0 10px;
      cursor: pointer;
    }
    .word {
      margin-left: 10px;
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
    .el-icon-bell,
    .el-icon-s-unfold {
      font-size: 20px;
      margin: 0 10px;
      cursor: pointer;
    }
  }
}
</style>