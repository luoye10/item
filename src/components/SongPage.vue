<template>
  <div class="songList">
    <ul class="itemList">
      <li
        class="item"
        v-for="(item, index) in songs"
        :key="item.massage"
        @click="songPlay"
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
  </div>
</template>
<script>
export default {
  props: ['songs'],
  data() {
    return {};
  },
  mounted() {},
  methods: {
    songPlay() {},
  },
};
</script>
<style lang="less" scoped>
.songList {
  position: absolute;
  left: 0;
  top: 100px;
  right: 0;
  bottom: 0;
}
.itemList {
  display: flex;
  flex-direction: column;
  .item {
    height: 100px;
    margin: 10px 30px;
    padding: 0 10px;
    border-radius: 5px;
    background: #e7dedecc;
    line-height: 100px;
    display: flex;
    cursor: pointer;
    .num {
      flex: 1;
    }
    .name {
      flex: 2;
    }
    .singer {
      flex: 2;
    }
    .album {
      flex: 4;
    }
    .time {
      flex: 1;
    }
  }
}
</style>
