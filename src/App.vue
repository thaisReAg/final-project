<script setup>
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { useUserStore } from './store/user.js'
 
const router = useRouter()
const userStore = useUserStore()
const { user } = storeToRefs(userStore)
 
onMounted(async () => {
  try {
    await userStore.fetchUser() // here we call fetch user
    if (!user.value) { //si no hay usuario
      // redirect them to logout if the user is not there
      router.push({ path: '/auth' });
    } else { // si hay usuario
      // continue to dashboard
      router.push({ path: '/' });
    }
  } catch (e) {
    console.log(e)
  }
})
</script>

<template>
  <section>
    <router-view class="app-main" /> <!-- your routes will load inside of these tags -->
  </section>
</template>
 
