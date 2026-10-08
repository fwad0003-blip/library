import { createRouter, createWebHistory } from 'vue-router'
import LibraryRegistrationForm from '../components/LibraryRegistrationForm.vue'
import AddBookView from '../views/AddBookView.vue'
import CountBookAPI from '../views/CountBookAPI.vue'

const routes = [
  { path: '/', name: 'Home', component: LibraryRegistrationForm },
  { path: '/addbook', name: 'AddBook', component: AddBookView },
  { path: '/CountBookAPI', name: 'CountBookAPI', component: CountBookAPI },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
