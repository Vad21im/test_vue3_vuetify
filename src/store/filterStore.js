import { defineStore } from 'pinia'

export const useFilterStore = defineStore('filter', {
  state: () => ({
    categorys: [],
    selectedCategory: '',
    min: '2',
    max: '',
  }),
  actions: {
    setFiltered(args) {
      this.selectedCategory = args.selectedCategory
      this.min = args.min
      this.max = args.max
    },
    getFiltered() {
      return {
        selectedCategory: this.selectedCategory,
        min: this.min,
        max: this.max
      }
    },
    setCategorys(categorys) {
      this.categorys = [...categorys]
    },
    getCategorys() {
      return this.categorys 
    },
  }
})