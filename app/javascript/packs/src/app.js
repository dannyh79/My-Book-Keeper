import Vue from 'vue/dist/vue.esm'
import axios from 'axios'

new Vue({
  el: "#app",
  data: {
    expense_type: '-',
    title: '',
    amount: '',
    description: '',
    items: []
  },
  mounted() {
    axios
      .get('http://localhost:3000/api/v1/book_keeping.json')
      .then((response) => this.items = response['data'])
  },
  computed: {
    total() {
      return this.items.reduce((sum, item) => {
        if (item.expense_type === '+') {
          return sum + item.amount
        }

        return sum - item.amount
      }, 0)
    }
  },
  methods: {
    clear() {
      this.expense_type = '-'
      this.title = ''
      this.amount = ''
      this.description = ''
    },
    addItem() {
      let item = {
        expense_type: this.expense_type,
        title: this.title,
        amount: this.amount,
        description: this.description
      }

      axios
        .post('http://localhost:3000/api/v1/book_keeping', item)
      this.items.unshift(item)
      this.clear()
    },
    showItem(item) {
      this.expense_type = item.expense_type
      this.title = item.title
      this.amount = item.amount
      this.description = item.description
    },
    deleteItem(item) {
      axios
        .delete(`http://localhost:3000/api/v1/book_keeping/${item.id}`)

      this.items = this.items.filter((i) => i.id !== item.id)
    }
  }
})
