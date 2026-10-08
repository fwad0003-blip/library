<script setup>
</script>

<template>
  <div style="grid-column: 1 / -1">
    <nav class="container mt-3 nav nav-pills justify-content-center gap-2">
      <router-link class="nav-link" active-class="active" to="/">Home</router-link>
      <router-link class="nav-link" active-class="active" to="/addbook">Add Book</router-link>
      <router-link class="nav-link" active-class="active" to="/CountBookAPI">Count Books</router-link>
    </nav>
    <router-view />
  </div>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
