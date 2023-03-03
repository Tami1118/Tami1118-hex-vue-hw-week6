// 主板
<template>
  這是 後台 頁面
  <router-link to="/admin">Dashboard</router-link> |
  <router-link to="/admin/products">Products</router-link> |
  <router-link to="/admin/orders">Orders</router-link> |
  <router-link to="/">Home</router-link> |
  <a href="#" @click.prevent="logout">LogOut</a>
  <hr />
  <RouterView></RouterView>
</template>

<script>
import { RouterView } from 'vue-router'
const { VITE_APP_URL } = import.meta.env

export default {
  components: {
    RouterView
  },
  methods: {
    logout () {
      document.cookie = `hexToken=; expires=${new Date()}`
      this.$router.push('/login')
    },
    checkAdmin () {
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1')
      this.$http.defaults.headers.common.Authorization = token
      const url = `${VITE_APP_URL}/api/user/check`
      this.$http.post(url)
        .then((res) => {
          console.log(res)
          if (!res.data.success) {
            this.$router.push('/login')
            alert('權限不足，請重新登入')
          }
        })
    }
  },
  mounted () {
    this.checkAdmin()
  }
}
</script>
