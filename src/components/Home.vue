<script setup>
  import { useUserStore } from "../stores/user.js";
  import { ref, onMounted } from "vue";

  const userStore = useUserStore();

  const today = ref("");

  function updateToday() {
    today.value = new Date().toLocaleDateString("en-US", {
      weekday: "long",
      day: "numeric",
      month: "long",
    });
  }
  updateToday();

  onMounted(async () => {
    if (!userStore.profile) {
      await userStore.fetchProfile();
    }
  });
</script>

<template>
  <section class="banner">
    <div>
      <h1 v-if="userStore.profile && userStore.profile.username">
        Welcome, {{ userStore.profile.username }}!
      </h1>
      <p>Today is {{ today }}, what do we have to do?</p>
    </div>
  </section>
</template>

<style scoped lang="scss">
  @import "../assets/_styles.scss";

  .banner {
    padding: 40px 20px;
    text-align: center;
    div {
      display: inline-block;
      padding: 20px;
      background: linear-gradient(
        to bottom,
        $light-color,
        $primary-color,
        $secondary-color
      );
      border-radius: 12px;
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    }

    h1 {
      font-size: 2.5em;
      color: $light-color;
      margin: 0;
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
      animation: fadeInDown 1s ease-in-out;
    }

    p {
      font-size: 1.2em;
      color: $light-color;
      margin-top: 10px;
      text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2);
      animation: fadeInUp 1s ease-in-out;
    }
  }

  // Animaciones para dar un efecto de entrada
  @keyframes fadeInDown {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>
