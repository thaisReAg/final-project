<script setup>
  import { ref } from "vue";
  import { useUserStore } from "../stores/user.js";

  const userStore = useUserStore();

  const email = ref("");
  const password = ref("");
  const username = ref("");
  const confirmPassword = ref("");

  function handleSignUp() {
    if (password.value === confirmPassword.value) {
      userStore.signUp(email.value, password.value, username.value);
    } else {
      console.log("Passwords do not match");
      userStore.errorMessage = "Passwords do not match";
    }
  }
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
        @submit.prevent="handleSignUp">
        <h2>Sign Up</h2>
        <div class="form-control">
          <label for="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Enter your username"
            required
            minlength="4"
            v-model="username" />
        </div>
        <div class="form-control">
          <label for="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            v-model="email"
            required />
        </div>
        <div class="form-control">
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            required
            minlength="7"
            v-model="password" />
        </div>
        <div class="form-control">
          <label for="confirm-password">Confirm Password</label>
          <input
            type="password"
            id="confirm-password"
            name="confirm-password"
            placeholder="Confirm your password"
            v-model="confirmPassword" />
        </div>
        <button
          class="submit-btn"
          type="submit">
          Sign Up
        </button>
        <p
          v-if="userStore.errorMessage"
          class="error-message">
          {{ userStore.errorMessage }}
        </p>
      </form>

      <button
        @click="toggleView"
        class="link-button">
        Already have an account
      </button>
    </div>
  </section>
</template>

<style lang="scss" scoped>
  @import "../assets/_styles.scss";
  .error-message {
  color: $error-color;
}
</style>
