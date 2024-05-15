<script setup>
  import { ref } from "vue";
  import { useUserStore } from "../stores/user.js";
  import { useRouter } from "vue-router";

  const userStore = useUserStore();
  const router = useRouter();
</script>

<template>
  <nav class="navbar">
    <div class="container">
      <a
        href="/"
        class="navbar-brand"
        ><img
          src="/src/assets/img/imagen2.png"
          alt=""
      /></a>
      <a
        href="/"
        class="navbar-brand"
        >Home</a
      >
      <router-link
        class="navbar-brand"
        to="/profile"
        >Perfil</router-link
      >
      <button
        @click="userStore.signOut()"
        class="navbar-brand">
        SignOut
      </button>
    </div>
  </nav>
</template>

<style scoped lang="scss">
  @import "../assets/_styles.scss";
  .navbar {
    background-color: $primary-color; // Naranja
    padding: 10px 0;
    .container {
      display: flex;
      justify-content: space-around;
      align-items: center;
      max-width: 1200px;
      margin: 0 auto;
      .navbar-brand {
        font-size: 20px;
        color: #fff;
        text-decoration: none;
        padding: 10px 20px;
        border-radius: 5px;
        transition: background-color 0.3s ease;

        &:hover {
          background-color: $secondary-color; // Verde
        }
        img {
          width: 50px;
          object-fit: cover;
        }
      }
    }
  }
</style>
