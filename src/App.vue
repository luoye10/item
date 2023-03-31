<template>
  <div id="app">
    <search-page></search-page>
  </div>
</template>

<script>
import SearchPage from './components/SearchPage.vue';
export default {
  components: { SearchPage },
};
</script>
<style>
body {
  background: url('./img/background.jpg');
  background-attachment: fixed;
}
</style>
