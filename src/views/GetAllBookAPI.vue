<script setup>
import { onMounted, ref } from 'vue'

const books = ref(null)
const error = ref(null)

const getAllBooks = async () => {
  error.value = null
  try {
    const response = await fetch(import.meta.env.VITE_GET_ALL_BOOKS_URL)
    if (!response.ok) throw new Error(`HTTP ${response.status}`)
    books.value = await response.json()
  } catch (err) {
    console.error('Error fetching books: ', err)
    error.value = err.message
  }
}

onMounted(getAllBooks)
</script>

<template>
  <div class="container mt-4">
    <h1 class="text-center">All Books (JSON)</h1>
    <p v-if="error" class="alert alert-danger">Error: {{ error }}</p>
    <p v-else-if="books === null" class="text-center">Loading...</p>
    <pre v-else class="bg-light border rounded p-3">{{ JSON.stringify(books, null, 2) }}</pre>
  </div>
</template>
