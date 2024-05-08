<script setup>
  import { useUserStore } from "../stores/user.js";
  import { ref } from "vue";

  const userStore = useUserStore();

  const username = ref(userStore.username);

  const today = ref("");

  function updateToday() {
    today.value = new Date().toLocaleDateString("es", {
      weekday: "long",
      day: "numeric",
      month: "long",
    });
  }
  updateToday();
</script>

<template>
  <section class="banner">
    <h1>Welcome, {{ username }}</h1>
    <p>Hoy es {{ today }}</p>
  </section>
</template>

<style scoped lang="scss">
  @import "../assets/_styles.scss";

  .banner {
    border: 5px solid $secondary-color;
    padding: 20px;
   

    h1 {
      color: $primary-color;
      font-size: 24px;
      font-weight: 700;
    }

    p {
      color: $primary-color;
      font-size: 18px;
    }
  }
</style>
