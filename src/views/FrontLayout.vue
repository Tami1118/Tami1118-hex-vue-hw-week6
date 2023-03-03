// 主板
<template>
  這是前台頁面
  <router-link to="/">Home</router-link> |
  <router-link to="/about">About</router-link> |
  <router-link to="/products">Products</router-link> |
  <router-link to="/cart">Cart</router-link> |
  <router-link to="/admin">Admin</router-link> |
  <router-link to="/login">Login</router-link>
  <hr />
  <router-view></router-view>
</template>

<script>
import { RouterView } from 'vue-router'

export default {
  components: {
    RouterView
  }
}
</script>
