<template>
  <div>
    <h1 class="mb-2">Все категории</h1>
    <Cards :items="productsItemFiltered" />
    <v-dialog
      v-model="dialog"
      @click:outside="shoppingCard.modalOpenClose"
      transition="dialog-bottom-transition"
      
    >
      <ShoppingCardTable :items="products"/>
    </v-dialog>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useFilterStore } from '@/store/filterStore'
import Cards from '@/components/Cards.vue'
import ShoppingCardTable from '@/components/ShoppingCardTable.vue'
import { useShoppingCard } from '@/store/shoppingCart'

const filterStore = useFilterStore()
const shoppingCard = useShoppingCard()
let products = ref([])
let dialog = computed(()=>{
  return shoppingCard.getModal()
})

const productsItemFiltered  = computed(()=>{
  let filter = filterStore.getFiltered()
  console.log(filter)
  let productsFiltered = [...products.value]
  if(!!filter.selectedCategory) {
    productsFiltered = productsFiltered.filter(e=>{
      return e.category === filter.selectedCategory
    })
  }
  if(!!filter.min) {
    productsFiltered = productsFiltered.filter(e=>{
      return e.price > filter.min
    })
  }
  if(!!filter.max) {
    productsFiltered = productsFiltered.filter(e=>{
      return e.price < filter.max
    })
  }
  return productsFiltered
})

// console.log(filterStore.getFiltered())

// categorys: [],
//     selectedCategory: '',
//     min: '',
//     nax: '',

function getProducts() {
  fetch('https://fakestoreapi.com/products')
            .then(res=>res.json())
            .then(json=>{
              products.value = json
              let categorys = []
              json.forEach(e => {
                if(!!e.category){
                  categorys.push(e.category)
                }
              });
              filterStore.setCategorys(new Set(categorys))
            })
}



onMounted(()=>{
  getProducts()
})

</script>