<template>
<div class="d-flex">
  
  <v-row>
    <v-col v-for="(item, index) in items" cols=12 sm=4>
      <v-card height="300" class="pa-3">
        <div class="mb-3" height="200">         
            <v-img height="180px" :src="item.image" :alt="item.title"></v-img>       
        </div>
        <v-spacer></v-spacer>
        <v-divider></v-divider>
        <v-card-title :title="item.title">{{ item.title }}</v-card-title>
        <v-btn @click="addItem(item.id)">В корзину</v-btn>
     </v-card>
    </v-col>      
  </v-row>
  
</div>
</template>
<script setup>
import { useShoppingCard } from '@/store/shoppingCart'
import { onMounted } from 'vue'
const shoppingCard = useShoppingCard()

const props = defineProps({
  items: {
        type: Array,
        required: true
      }
})
function addItem(id){
        let oldArr = JSON.parse(localStorage.getItem("productsId")) || []
        localStorage.setItem('productsId',JSON.stringify([id, ...oldArr]))
        shoppingCard.setCount(JSON.parse(localStorage.getItem("productsId"))?.length)
      }

onMounted(()=>{
  shoppingCard.setCount(JSON.parse(localStorage.getItem("productsId"))?.length)
})

</script>