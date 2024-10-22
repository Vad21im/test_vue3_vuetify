<template>
  <div>
    <v-form  class="d-flex justify-center align-content-center" style="margin-top: 25%;">
      <v-card class="pa-5" width="400">
        <h3 class="text-center mb-3">Форма авторизации</h3>
        <v-text-field v-model="email" :rules="[required, isValidEmail]" label="Почта" placeholder="Ввидите почту"/>
        <v-text-field v-model="pass" :rules="[required]" label="Пароль" placeholder="Ввидите пароль"/>
        <div class="d-flex justify-end">
          <v-btn  style="background-color: #76ddb8;" class="right" @click="login">Login</v-btn>
          <!-- :disabled="!email || !pass" -->
        </div>
      </v-card>
    </v-form>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/store/authStore'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
const authStore = useAuthStore()
const router = useRouter()

let email = ref('')
let pass = ref('')

const required = (value) => isNotEmpty(value) || 'Введите пароль'
const isNotEmpty = (value) => {
    if (Array.isArray(value)) {
      return value.length > 0
    }
    return value === 0 || !!value
  }
const isValidEmail = (value) => (validEmail(value) || !value) || 'Введите валидный email'
const validEmail = (value) => /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(`${value}`)
  
  
function login() {
  authStore.login()
  router.push({path: '/'})
}
</script>