<template>
  <div>
    <table class="table align-middle">
      <thead>
        <tr>
          <th></th>
          <th>品名</th>
          <th style="width: 150px">數量/單位</th>
          <th class="text-end">單價</th>
          <th class="text-end">小計</th>
        </tr>
      </thead>
      <tbody>
        <template v-if="cart.carts">
          <tr v-for="item in cart.carts" :key="item.id + 1234">
            <td>
              <button
                type="button"
                class="btn btn-outline-danger btn-sm"
                @click="deleteCartItem(item)"
              >
                <i class="fas fa-spinner fa-pulse"></i>
                x
              </button>
            </td>
            <td>
              {{ item.product.title }}
            </td>
            <td>
              <div class="input-group input-group-sm">
                <div class="input-group mb-3">
                  <select
                    name=""
                    id=""
                    v-model="item.qty"
                    class="form-select"
                    @change="updateCartItem(item)"
                    :disabled="item.id === loadingItem"
                  >
                    <option :value="i" v-for="i in 20" :key="`${i}1234`">
                      {{ i }}
                    </option>
                  </select>
                </div>
              </div>
            </td>
            <td class="text-end">
              {{ item.product.price }}
            </td>
            <td class="text-end">
              {{ item.final_total }}
            </td>
          </tr>
        </template>
      </tbody>
      <tfoot>
        <tr>
          <td colspan="4" class="text-end">總計</td>
          <td class="text-end">{{ cart.total }}</td>
        </tr>
        <tr>
          <td colspan="4" class="text-end text-success">折扣價</td>
          <td class="text-end text-success">{{ cart.final_total }}</td>
        </tr>
      </tfoot>
    </table>
  </div>
</template>

<script>
const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env

export default {
  data () {
    return {
      products: [],
      productId: '',
      cart: [],
      loadingItem: '' // 存取id, 判斷 disabled **
    }
  },
  methods: {
    getCart () {
      // console.log('getCart');
      this.$http
        .get(`${VITE_APP_URL}/v2/api/${VITE_APP_PATH}/cart`)
        .then((res) => {
          // console.log('購物車資料:', res.data.data);
          this.cart = res.data.data
        })
    },

    updateCartItem (item) {
      // 產品id 與 購物車id
      const data = {
        product_id: item.product.id, // 產品id
        qty: item.qty
      }
      // console.log(data, item); // 確認格式 第一層id為購物車id, 第二層id為產品id
      this.loadingItem = item.id // 存取id
      this.$http
        .put(`${VITE_APP_URL}/v2/api/${VITE_APP_PATH}/cart/${item.id}`, {
          data
        }) // 購物車id
        .then((res) => {
          // console.log('更新購物車:',res);
          this.getCart()
          this.loadingItem = '' // 更新後清除id
        })
    },

    deleteCartItem (item) {
      this.loadingItem = item.id
      this.$http
        .delete(`${VITE_APP_URL}/v2/api/${VITE_APP_PATH}/cart/${item.id}`)
        .then((res) => {
          // console.log('刪除購物車:',res);
          this.getCart()
          this.loadingItem = ''
        })
    }
  },
  mounted () {
    // console.log('mounted');
    this.getCart()
  }
}
</script>
