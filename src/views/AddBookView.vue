<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp } from 'firebase/firestore'
import db from '../firebase/init.js'

const isbn = ref('')
const name = ref('')
const author = ref('')
const books = ref([])
const message = ref('')

let unsubscribe = null

onMounted(() => {
  // Live listener: the row first appears as typed, then updates as soon as the
  // capitaliseBookData Cloud Function rewrites the document.
  const q = query(collection(db, 'books'), orderBy('createdAt', 'desc'))
  unsubscribe = onSnapshot(q, (snapshot) => {
    books.value = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
  })
})

onUnmounted(() => unsubscribe?.())

const addBook = async () => {
  try {
    const docRef = await addDoc(collection(db, 'books'), {
      isbn: isbn.value,
      name: name.value,
      author: author.value,
      createdAt: serverTimestamp(),
    })
    message.value = `Book added (id ${docRef.id}). Waiting for the Cloud Function to capitalise it...`
    isbn.value = ''
    name.value = ''
    author.value = ''
  } catch (error) {
    console.error('Error adding book: ', error)
    message.value = `Error adding book: ${error.message}`
  }
}
</script>

<template>
  <div class="container mt-4">
    <h1 class="text-center">Add Book</h1>
    <form class="row g-3 mb-3" @submit.prevent="addBook">
      <div class="col-md-3">
        <label for="isbn" class="form-label">ISBN</label>
        <input id="isbn" v-model="isbn" type="text" class="form-control" required />
      </div>
      <div class="col-md-4">
        <label for="name" class="form-label">Name</label>
        <input id="name" v-model="name" type="text" class="form-control" required />
      </div>
      <div class="col-md-3">
        <label for="author" class="form-label">Author</label>
        <input id="author" v-model="author" type="text" class="form-control" required />
      </div>
      <div class="col-md-2 d-flex align-items-end">
        <button type="submit" class="btn btn-primary w-100">Add Book</button>
      </div>
    </form>
    <p v-if="message" class="alert alert-info">{{ message }}</p>

    <h2 class="h4">Books in Firestore</h2>
    <table class="table table-bordered align-middle">
      <thead class="table-light">
        <tr>
          <th>As entered (originalData)</th>
          <th>Stored in Firestore</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="book in books" :key="book.id">
          <td>
            <template v-if="book.originalData">
              {{ book.originalData.isbn }} — {{ book.originalData.name }} by
              {{ book.originalData.author }}
            </template>
            <template v-else>{{ book.isbn }} — {{ book.name }} by {{ book.author }}</template>
          </td>
          <td>{{ book.isbn }} — {{ book.name }} by {{ book.author }}</td>
          <td>
            <span v-if="book.capitalisedAt" class="badge bg-success">Capitalised by Function</span>
            <span v-else class="badge bg-warning text-dark">Pending</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
