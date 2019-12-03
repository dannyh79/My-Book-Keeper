import Vue from 'vue/dist/vue.esm'

new Vue({
  el: "#app", 
  data: {
    expense_type: '-',
    title: '', 
    amount: '', 
    description: '', 
    items: [
      {id: 1, expense_type: '-', title: '買 iphone', amount: 20000, description: 'Hello'}, 
      {id: 2, expense_type: '+', title: '買書', amount: 1000, description: 'World'}, 
    ]
  }, 
  computed: {
    total() {
      return this.items.reduce(function(sum, item){
        if (item.expense_type === '+') {
          return sum + item.amount
        } else {
          return sum - item.amount
        }
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
