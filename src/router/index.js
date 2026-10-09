import { createRouter, createWebHistory } from 'vue-router'
import LibraryRegistrationForm from '../components/LibraryRegistrationForm.vue'
import AddBookView from '../views/AddBookView.vue'
import CountBookAPI from '../views/CountBookAPI.vue'
import GetAllBookAPI from '../views/GetAllBookAPI.vue'
import WeatherView from '../views/WeatherView.vue'

const routes = [
  { path: '/', name: 'Home', component: LibraryRegistrationForm },
  { path: '/addbook', name: 'AddBook', component: AddBookView },
  { path: '/CountBookAPI', name: 'CountBookAPI', component: CountBookAPI },
  { path: '/GetAllBookAPI', name: 'GetAllBookAPI', component: GetAllBookAPI },
  { path: '/weather', name: 'Weather', component: WeatherView },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
