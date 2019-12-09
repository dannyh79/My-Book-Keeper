import Vue from 'vue/dist/vue.esm'
import axios from 'axios'

new Vue({
  el: "#app",
  data: {
    id: 0,
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
      this.id = 0
      this.expense_type = '-'
      this.title = ''
      this.amount = ''
      this.description = ''
    },
    saveItem(item) {
      if (this.id === 0) {
        let newItem = {
          expense_type: this.expense_type,
          title: this.title,
          amount: this.amount,
          description: this.description
        }
        axios
          .post('http://localhost:3000/api/v1/book_keeping', newItem)
        this.items.unshift(newItem)
      } else {
        let editedItem = {
          expense_type: this.expense_type,
          title: this.title,
          amount: this.amount,
          description: this.description
        }
        axios
          .put(`http://localhost:3000/api/v1/book_keeping/${this.id}`, editedItem)
        this.items = this.items.map((i) => i.id === this.id ? editedItem : i )
      }
      this.clear()
    },
    showItem(item) {
      this.id = item.id
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
