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
    // WIP
    addItem(event) {
      event.preventDefault()
      
      let item = {
        id: 3, 
        expense_type: this.expense_type, 
        title: this.title, 
        amount: this.amount, 
        description: this.description
      }
      this.items.unshift(item)
      this.clear()
    }
  }
})
