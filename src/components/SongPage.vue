<template>
  <div class="songList">
    <ul class="itemList">
      <li
        :class="['item', { active: item.id === songId }]"
        v-for="(item, index) in songs"
        :key="item.massage"
        @click="songPlay(item.id, item)"
      >
        <div class="num">
          {{ index + 1 < 10 ? '0' + (index + 1) : index + 1 }}
        </div>
        <div class="name">{{ item.name }}</div>
        <div class="singer">{{ item.artists[0].name }}</div>
        <div class="album">{{ item.album.name }}</div>
        <div class="time">{{ item.duration }}</div>
      </li>
    </ul>
    <audio :src="src" ref="audio" @timeupdate="time"></audio>
  </div>
</template>
<script>
import { getSongUrl } from '../api/index';
export default {
  props: ['songs'],
  data() {
    return {
      songId: null,
      src: '',
      currentTime: '',
      isShow: false,
      item: null,
    };
  },
  methods: {
    songPlay(id, item) {
      this.songId = id;
      this.item = item;
      getSongUrl(this.songId)
        .then((res) => {
          this.src = res.data.data[0].url;
          this.$refs.audio.onloadedmetadata = () => {
            this.$refs.audio.play();
            this.time();
          };
        })
        .catch((error) => {
          console.log(error);
        });
    },
    time() {
      this.currentTime = Math.floor(this.$refs.audio.currentTime);
      this.$bus.$emit(
        'send',
        this.item,
        this.currentTime,
        this.src,
        this.isShow
      );
    },
  },
};
</script>
<style lang="less" scoped>
.songList {
  position: absolute;
  top: 80px;
  left: 0;
  right: 0;
  bottom: 200px;
}
.itemList {
  margin: 20px;
  display: flex;
  flex-direction: column;
  .item {
    height: 100px;
    margin: 10px 0;
    padding: 0 10px;
    border-radius: 5px;
    background: #dadada;
    line-height: 100px;
    display: flex;
    cursor: pointer;
    .num {
      flex: 1;
    }
    .name {
      flex: 2.5;
    }
    .singer {
      flex: 2;
    }
    .album {
      flex: 3.5;
    }
    .time {
      flex: 1;
    }
  }
  .active {
    background: aqua;
  }
}
</style>
