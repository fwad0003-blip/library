<script setup>
import { onMounted, ref } from 'vue'

const count = ref(null)
const error = ref(null)

const getBookCount = async () => {
  error.value = null
  try {
    const response = await fetch(import.meta.env.VITE_COUNT_BOOKS_URL)
    if (!response.ok) throw new Error(`HTTP ${response.status}`)
    const data = await response.json()
    count.value = data.count
  } catch (err) {
    console.error('Error fetching book count: ', err)
    error.value = err.message
  }
}

onMounted(getBookCount)
</script>

<template>
  <div class="container mt-4 text-center">
    <h1>Book Counter</h1>
    <p v-if="error" class="alert alert-danger">Error: {{ error }}</p>
    <p v-else-if="count === null">Loading...</p>
    <p v-else class="display-6">Total number of books: {{ count }}</p>
    <button class="btn btn-primary" @click="getBookCount">Refresh</button>
  </div>
</template>
