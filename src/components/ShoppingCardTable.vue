<template>
<v-toolbar class="rounded-t-lg">
  <v-btn
    icon="mdi-close"
    @click="shoopingCard.modalOpenClose"
  ></v-btn>
  <v-toolbar-title>
    <picture :src="logo">
      <img  height="50" :src="logo" alt="">
    </picture>
  </v-toolbar-title>
</v-toolbar>
  <div class="bg-white pa-5 rounded-b-lg">
    <h3>Товары в корзине</h3>
    <v-data-table-virtual
    :headers="headers"
    :key="idInShoppingCard.length"
    :items="itemsTable"
    height="400"
    item-value="name"
  >
    <template #item.count="{item}">
      <v-row>
        <v-spacer></v-spacer>
        <v-btn @click="countEdit('-', item.id)" size="x-small">-</v-btn>
        <p class="mx-2">{{getCount(item.id)}}</p>
        <v-btn @click="countEdit('+', item.id)" size="x-small">+</v-btn>
    </v-row>
    </template>
    <template #item.total="{item}">
      {{ (item.price * getCount(item.id)).toFixed(1)}}
    </template>
    <template #item.id="{item, index}">
      {{ index + 1}}
    </template>
    <template  #no-data>
      <h3>Корзина пуста</h3>
      <v-btn @click="shoopingCard.modalOpenClose" class="mt-2 mb-3" size="small" style="background-color: #76ddb8;">Вернуться к покупкам</v-btn>
    </template>
  </v-data-table-virtual> 
  <div class="pa-2">
    <v-row>
      <h3>Всего товаров {{ quantityTotal }} на сумму {{ priceTotal }}</h3>
      <v-spacer></v-spacer>
      <v-btn @click="dialog = true" :disabled="idInShoppingCard.length < 1" style="background-color: #76ddb8;">Оформить заказ</v-btn>
    </v-row>
  </div>  
  </div>
  <v-dialog v-model="dialog" width="auto" @click:outside="dialog = false">
    <v-card class="pa-5 rounded-lg">
      <h2 class="mb-6 text-center">Заказ № 12345</h2>
      <h5 class="text-center mb-6">Ваш заказ успешно <br> оформлен</h5>
      <v-btn @click="orderApply" style="background-color: #76ddb8;">Закрыть</v-btn>
    </v-card>

  </v-dialog>
</template>
<script setup>
import { computed, onMounted } from 'vue'
import { ref } from 'vue'
import logo from '../assets/logo.png'
import { useShoppingCard } from '@/store/shoppingCart'
const shoopingCard = useShoppingCard()
const props = defineProps({
  items: {
        type: Array,
        required: true
      }
})
let itemsProps = ref([...props.items])
let dialog = ref(false)

let idInShoppingCard = JSON.parse(localStorage.getItem("productsId")) || []
let headers = [
          { title: '№', align: 'start', key: 'id' },    
          { title: 'Название', align: 'start', key: 'title' },
          { title: 'Количество', align: 'end', key: 'count' },
          { title: 'Цена', align: 'end', key: 'price' },
          { title: 'Итого', align: 'end', key: 'total' },
        ]

let quantity = ref([])
let quantityTotal = computed(()=>{
  return quantity.value.reduce((result, item)=>{
    return result += item.count
  },0)
})

function getPrice(id){
  return itemsTable.value?.find(e=>e.id === id)?.price
}

let priceTotal = computed(()=>{
  let result = 0
  quantity.value.forEach(e=>{
    for(let i = 0; i < e.count; i++){
      result += getPrice(e.id)
    }
  })
  if(isNaN(result.toFixed(1))){
    return 0
  }
  return result.toFixed(1) || 0
})

const itemsTable = computed(()=>{
  let result = []
  result = itemsProps.value.filter(e=>{
    return idInShoppingCard.includes(e.id)
  })
  return result
})

function getCount(id) {
  return quantity.value.find(e => e.id === id)?.count
}

function countEdit(operation, id) {
  if(operation === '+') quantity.value[quantity.value?.findIndex(y => y.id === id)].count += 1
  if(quantity.value[quantity.value?.findIndex(y => y.id === id)].count > 1) {
    if(operation === '-') quantity.value[quantity.value?.findIndex(y => y.id === id)].count -= 1
  }
}

function orderApply() {
  localStorage.setItem('productsId',JSON.stringify([]))
  dialog.value = false
  quantity.value = []
  itemsProps.value = []
}

onMounted(()=>{
  idInShoppingCard.forEach(x=>{
    let index = quantity.value?.findIndex(y => y.id === x)
      if(index !== -1) {
        quantity.value[index].count += 1
      } else {
        quantity.value.push({id: x, count: 1})
      }
  })  
})

</script>