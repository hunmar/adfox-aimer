<template>
  <div id="app">
    <input v-model="aimUrl" />
    <input :value="inliner" />
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return { aimUrl: "", inliner: "", regExp: /bindObject\?p=(.*)$/ };
  },
  watch: {
    aimUrl(newVal) {
      const match = this.regExp.exec(newVal);
      if (match && match[1]) {
        this.inliner = `javascript:(function(){var date = new Date(); date.setTime(date.getTime() + 15 * 60 * 1000); var expires = "; expires=" + date.toUTCString(); document.cookie = "bindobj=${
          match[1]
        }" + expires + "; path=/"; window.location = window.location;})();`;
      } else {
        this.inliner = "";
      }
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  display: flex;
  flex-direction: column;
}

input {
  font-size: 45px;
  padding: 40px;
  margin: 40px;
}
</style>
