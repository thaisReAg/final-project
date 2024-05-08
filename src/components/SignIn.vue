<script setup>
  import { useUserStore } from "@/stores/user";
  import { ref } from "vue";
  import router from "@/router";

  const userStore = useUserStore();

  const email = ref("");
  const password = ref("");

  defineProps({
    toggleView: Function,
  });
</script>

<template>
  <section>
    <img
      src="../assets/img/imagen2.png"
      alt="" />
    <div class="form-container">
      <form
        class="form"
        @submit.prevent="userStore.signIn(email, password)">
        <h2>Sign In</h2>
        <div class="form-control">
          <label for="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            v-model="email" />
        </div>
        <div class="form-control">
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            v-model="password" />
        </div>
        <div
          v-if="userStore.errorMessage"
          class="error-message">
          {{ userStore.errorMessage }}
        </div>
        <button
          class="submit-btn"
          type="submit">
          Sign In
        </button>
      </form>
      <button
        @click="toggleView"
        class="link-button">
        Don't have an account?
      </button>
    </div>
  </section>
</template>
<style lang="scss" scoped>
  @import "../assets/_styles.scss";
</style>
