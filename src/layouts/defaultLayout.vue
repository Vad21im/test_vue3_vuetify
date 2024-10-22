<template>
  <v-app id="inspire">
    
    <v-app-bar>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      
      <v-app-bar-title>
        <router-link to="/">
          <picture :src="logo">
            <img  height="50" :src="logo" alt="">
          </picture>
        </router-link></v-app-bar-title>
      <v-spacer></v-spacer>
      <v-btn @click="shoopingCard.modalOpenClose" class="position-relative border-thin" :disabled="route.path === '/auth'" >
        <span>Корзина</span>
        <span v-if="countCards" class="badge">{{ countCards }}</span>
      </v-btn>    
      <v-btn v-if="route.path !== '/auth'" @click="logout">Logout</v-btn>
    </v-app-bar>

    <v-navigation-drawer class="pa-3" width="325" temporary v-model="drawer">
      <Filter @clousePanel="drawer = false"/>
    </v-navigation-drawer>
    <v-main>
      <v-container>
        <slot></slot>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
  import Filter from '@/components/Filter.vue'
  import { computed, ref } from 'vue'
  import logo from '../assets/logo.png'
  import { useRoute, useRouter } from 'vue-router'
  import { useAuthStore } from '@/store/authStore'  
  import { useShoppingCard } from '@/store/shoppingCart'
  const shoopingCard = useShoppingCard()
  const route = useRoute()
  let drawer = ref(false)
  
  const router = useRouter()
  const authStore = useAuthStore()
  function logout() {
    authStore.logout()
    router.go(0)
  }  
  let countCards = computed(()=>{
    return shoopingCard.getCount() || false
  })

</script>
<style scoped>
.badge {
  position: absolute;
  top: -10px;
  right: -10px;
  border: solid 1px black;
  color: rgb(0, 0, 0);
  border-radius: 50%;
  padding: 0.2em 0.3em;
  font-size: 0.75em;
}
</style>

