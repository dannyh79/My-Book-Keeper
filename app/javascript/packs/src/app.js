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
          .then((res) => {
            if (res.status === 200) {
              axios
                .get('http://localhost:3000/api/v1/book_keeping.json')
                .then((response) => {
                  if (response.status === 200) {
                    this.items = response['data']
                    window.alert(`Item (${newItem.title}) successfully added!`)
                  } else {
                    throw 'failed to add item'
                  }
                })
                .catch((error) => {
                  window.alert(
                    `
                      Something went wrong (${error}).
                      Please re-try.
                    `
                  )
                })
            }
          })
      } else {
        const editedItem = {
          expense_type: this.expense_type,
          title: this.title,
          amount: this.amount,
          description: this.description
        }
        const expenseType = {
          '-': 'expense',
          '+': 'income'
        }
        const WordedExpenseType = expenseType[this.expense_type]
        const confirmation = confirm(
          `
            You are about to edit the item to the following:
            - Type: ${WordedExpenseType}
            - Title: ${this.title}
            - Amount: ${this.amount}
            - Description: ${this.description}
          `
        )
        if (confirmation) {
          axios
            .put(`http://localhost:3000/api/v1/book_keeping/${this.id}`, editedItem)
            .then((response) => {
              if (response.status === 200) {
                this.items = this.items.map((i) => i.id === this.id ? editedItem : i )
                this.clear()
                window.alert('Item edited!')
              } else {
                throw 'failed to edit item'
              }
            })
            .catch((error) => {
              window.alert(
                `
                  Something went wrong (${error}).
                  Please re-try.
                `
              )
            })
        }
      }
    },
    showItem(item) {
      this.id = item.id
      this.expense_type = item.expense_type
      this.title = item.title
      this.amount = item.amount
      this.description = item.description
    },
    deleteItem(item) {
      const confirmation = confirm(
        `
          You are about to delete the following item:
          - Type: ${WordedExpenseType}
          - Title: ${this.title}
          - Amount: ${this.amount}
          - Description: ${this.description}
        `
      )
      if (confirmation) {
        axios
          .delete(`http://localhost:3000/api/v1/book_keeping/${item.id}`)
          .then((response) => {
            if (response.status === 200) {
              this.items = this.items.filter((i) => i.id !== item.id)
              window.alert(`Item (${item.title}) successfully deleted!`)
            } else {
              throw 'failed to deleted item'
            }
          })
          .catch((error) => {
            window.alert(
              `
                Something went wrong (${error}).
                Please re-try.
              `
            )
          })
      }
    }
  }
})
