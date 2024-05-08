<script setup>
  import { ref } from "vue";
 
  import SignIn from "../components/SignIn.vue";
  import SignUp from "../components/SignUp.vue";

  const hasUser = ref(true);
  const toggleView = () => {
    hasUser.value = !hasUser.value;
  };
</script>

<template>
 
  <section>
    <article>
      <SignIn
        v-if="hasUser"
        :toggleView="toggleView" />
    </article>
    <article>
      <SignUp
        v-if="!hasUser"
        :toggleView="toggleView" />
    </article>
  </section>
</template>
<style lang="scss" scoped></style>
