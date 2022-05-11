<template>
  <div id="app">
    <!-- 로그아웃 상태 -->
    <nav v-if="!fnGetAuthStatus">
      <router-link to="/">Home</router-link> |
      <router-link to="/register">회원가입</router-link>
    </nav>

    <!-- 로그인 상태 -->
    <nav v-else>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">로그아웃</router-link> |
      <router-link to="/about">회원탈퇴</router-link>
    </nav>

    <router-view/>
  </div>
</template>

<script>
export default {
  computed: {
    fnGetAuthStatus() {
      return this.$store.getters.fnGetAuthStatus;
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
