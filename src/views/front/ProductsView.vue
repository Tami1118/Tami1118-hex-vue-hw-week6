<template>
  <table class="table align-middle">
    <thead>
      <tr>
        <th class="text-center">產品圖片</th>
        <th>產品名稱</th>
        <th>產品價格</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="product in products" :key="product.id">
        <td width="200">
          <div
            style="
              height: 100px;
              background-size: cover;
              background-position: center;
            "
            :style="{ backgroundImage: `url(${product.imageUrl})` }"
          ></div>
        </td>
        <td>{{ product.title }}</td>
        <td>
          <div v-if="product.price === product.origin_price">
            {{ product.price }}元
          </div>
          <div v-else>
            <del>原價{{ product.origin_price }}元</del>
            <div>
              特價 <strong class="text-danger h5">{{ product.price }}</strong
              >元
            </div>
          </div>
        </td>
        <td>
          <div class="btn-group btn-group-sm">
            <RouterLink
              class="btn btn-outline-secondary"
              :to="`product/${product.id}`"
              >產品細節</RouterLink
            >
            <button
              class="btn btn-outline-primary"
              @click="addToCart(product.id)"
            >
              加入購物車
            </button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { RouterLink } from 'vue-router'

const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env

// 1. 初學者，自己慢慢去改 => 建議可以去嘗試了解問題，每一家eslint標準不太一樣
// 2. 可以直接統一修正

export default {
  data () {
    return {
      products: []
    }
  },
  methods: {
    getProducts () {
      // console.log('getProducts')
      this.$http
        .get(`${VITE_APP_URL}/v2/api/${VITE_APP_PATH}/products/all`)
        .then((res) => {
          console.log(res)
          this.products = res.data.products
        })
    },
    addToCart (id) {
      const data = {
        product_id: id,
        qty: 1
      }
      this.$http
        .post(`${VITE_APP_URL}/v2/api/${VITE_APP_PATH}/cart`, { data })
        .then((res) => {
          console.log('加入購物車:', res)
        })
    }
  },
  components: {
    RouterLink
  },
  mounted () {
    this.getProducts()
  }
}
</script>

<style lang="scss">
th,
td {
  padding: 10px;
}
</style>
