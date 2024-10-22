<template>
<div>
  <h3 class="text-center mb-3">Фильтр</h3>
      <h4 class="mb-1">Категория</h4>
      <v-select v-model="category" :items="options" label="Выберите категорию" dense></v-select>
      <h4 class="mb-1">Цена </h4>
      <v-row>
      <v-col>
          <v-text-field type="number" v-model="min" label="Мин. цена"></v-text-field>
      </v-col>
      <v-col>
          <v-text-field type="number" v-model="max" label="Макс. цена"></v-text-field>
      </v-col>
      </v-row>
      <v-col>
      <v-btn @click="filterClear" style="background-color: #cdc243;" width="100%">Сброс</v-btn>
      </v-col>
      <v-col>
      <v-btn @click="filterConfirm" style="background-color: #76ddb8;" width="100%">Приминить</v-btn>
      </v-col>
</div>
</template>
<script setup>
  import { computed, onMounted, ref } from 'vue'
  import { useFilterStore } from '@/store/filterStore'
  const emit = defineEmits(['clousePanel'])

  const filterStore = useFilterStore()
  let category = ref('')
  let min = ref('')
  let max = ref('')
  let options = computed(()=>{
    let res = filterStore.getCategorys()
    return res
  })


  function filterConfirm() {
    filterStore.setFiltered({
      selectedCategory: category.value,
      min: min.value,
      max: max.value,
    })
    emit('clousePanel')
  }

  function filterClear() {
    category.value = ''
    min.value = ''
    max.value = ''
    filterStore.setFiltered({
      selectedCategory: '',
      min: '',
      max: '',
    })
  }

  onMounted(()=>{
    // console.log('123')
  })
</script>