<script setup>
import { computed, onMounted, ref } from 'vue'

const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather'

const city = ref('')
const weather = ref(null)
const error = ref(null)
const loading = ref(false)

const temperature = computed(() => (weather.value ? Math.round(weather.value.main.temp) : null))
const iconUrl = computed(() =>
  weather.value
    ? `https://openweathermap.org/img/wn/${weather.value.weather[0].icon}@2x.png`
    : null,
)

// units=metric makes OpenWeatherMap return temperatures in Celsius.
const fetchWeather = async (params) => {
  loading.value = true
  error.value = null
  try {
    const query = new URLSearchParams({ ...params, appid: apiKey, units: 'metric' })
    const response = await fetch(`${baseUrl}?${query}`)
    const data = await response.json()
    if (!response.ok) throw new Error(data.message || `HTTP ${response.status}`)
    weather.value = data
  } catch (err) {
    console.error('Error fetching weather: ', err)
    error.value = err.message
    weather.value = null
  } finally {
    loading.value = false
  }
}

// eFolio 10.1 — weather for the browser's current location.
const fetchCurrentLocationWeather = () => {
  if (!navigator.geolocation) {
    error.value = 'Geolocation is not supported by this browser.'
    return
  }
  loading.value = true
  navigator.geolocation.getCurrentPosition(
    ({ coords }) => fetchWeather({ lat: coords.latitude, lon: coords.longitude }),
    (err) => {
      loading.value = false
      error.value = `Could not get your location: ${err.message}`
    },
  )
}

// eFolio 10.2 — weather by city, e.g. "Clayton, AU".
const searchByCity = () => {
  if (city.value.trim()) fetchWeather({ q: city.value.trim() })
}

onMounted(fetchCurrentLocationWeather)
</script>

<template>
  <div class="container mt-4" style="max-width: 640px">
    <h1 class="text-center">Weather</h1>
    <form class="input-group mb-3" @submit.prevent="searchByCity">
      <input
        id="city"
        v-model="city"
        type="text"
        class="form-control"
        placeholder='Enter a city, e.g. "Clayton, AU"'
      />
      <button type="submit" class="btn btn-primary">Search</button>
      <button type="button" class="btn btn-outline-secondary" @click="fetchCurrentLocationWeather">
        Current location
      </button>
    </form>

    <p v-if="loading" class="text-center">Loading...</p>
    <p v-else-if="error" class="alert alert-danger">Error: {{ error }}</p>
    <div v-else-if="weather" class="card text-center">
      <div class="card-body">
        <h2 class="card-title h3">{{ weather.name }}, {{ weather.sys.country }}</h2>
        <img :src="iconUrl" :alt="weather.weather[0].description" width="100" height="100" />
        <p class="display-4 mb-0">{{ temperature }} °C</p>
        <p class="text-capitalize text-muted">{{ weather.weather[0].description }}</p>
        <p class="mb-0">
          Feels like {{ Math.round(weather.main.feels_like) }} °C · Humidity
          {{ weather.main.humidity }}%
        </p>
      </div>
    </div>
  </div>
</template>
