<template>
  <div class="songList">
    <ul class="itemList">
      <li
        :class="['item', { active: item.id === songId }]"
        v-for="(item, index) in songs"
        :key="item.id"
        @click="songPlay(item.id, item)"
      >
        <div class="num">
          {{ index + 1 < 10 ? '0' + (index + 1) : index + 1 }}
        </div>
        <div class="icon">
          <heart-icon
            @click.stop.native="collect(item)"
            v-if="!selectIds.includes(item.id)"
          ></heart-icon>
          <select-heart
            v-else
            class="click"
            @click.stop.native="collect(item)"
          ></select-heart>
        </div>
        <div class="name">{{ item.name }}</div>
        <div class="singer">{{ item.artists[0].name }}</div>
        <div class="album">{{ item.album.name }}</div>
        <div class="time">{{ item.duration }}</div>
      </li>
    </ul>
    <audio
      :src="src"
      ref="audio"
      @timeupdate="time"
      @ended="stopPlay"
      class="player"
    ></audio>
  </div>
</template>
<script>
import HeartIcon from '@/assets/icons/HeartIcon.vue';
import { getSongUrl } from '../api/index';
import SelectHeart from '@/assets/icons/SelectHeart.vue';
import { getValue, setValue } from '@/util/saveAndGet';
export default {
  props: ['songs'],
  components: {
    HeartIcon,
    SelectHeart,
  },
  data() {
    return {
      songId: null,
      src: '',
      currentTime: '',
      item: null,
      selectSongs: [],
      selectIds: [],
    };
  },
  mounted() {
    this.selectSongs = getValue('my like') || [];
    this.selectIds = this.selectSongs.map((s) => s.id);
  },
  methods: {
    songPlay(id, item) {
      this.songId = id;
      this.item = item;
      getSongUrl(this.songId)
        .then((res) => {
          this.src = res.data.data[0].url;
          this.$refs.audio.onloadedmetadata = () => {
            this.$bus.$emit('startPlay', this.item, false);
            this.$bus.$emit('lyric', id);
            this.$bus.$emit('comment', id);
            this.$refs.audio.play();
          };
        })
        .catch((error) => {
          console.log(error);
        });
    },
    time() {
      this.currentTime = Math.floor(this.$refs.audio.currentTime);
      this.$bus.$emit('current', this.currentTime);
    },
    stopPlay() {
      this.$bus.$emit('playStop', true);
    },
    collect(song) {
      const index = this.selectIds.findIndex((s) => s === song.id);
      if (index > -1) {
        this.selectSongs.splice(index, 1);
        this.selectIds.splice(index, 1);
      } else {
        this.selectSongs.push(song);
        this.selectIds.push(song.id);
      }
      setValue('my like', this.selectSongs);
    },
  },
};
</script>
<style lang="less" scoped>
.songList {
  margin-left: 200px;
  margin-top: 80px;
  margin-bottom: 100px;
  overflow: auto;
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
    align-items: center;
    cursor: pointer;
    .num {
      width: 20px;
    }
    .icon {
      width: 20px;
      margin: 0 20px;
      .click {
        color: red;
      }
    }
    .name {
      flex: 2.5;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
    .singer {
      flex: 1.5;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      margin: 0 10px;
    }
    .album {
      flex: 2;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
    .time {
      width: 30px;
      margin: 0 10px;
    }
  }
  .active {
    background: aqua;
  }
}
</style>
