import { defineStore } from 'pinia'

export const useShoppingCard = defineStore('shoppingCard', {
  state: () => ({
    countCards: null,
    modal: false
  }),
  actions: {
    setCount(count) {
      this.countCards = count
    },
    getCount() {
      return this.countCards
    },
    modalOpenClose(){
      this.modal = !this.modal
    },
    getModal() {
      return this.modal
    }
  }
})