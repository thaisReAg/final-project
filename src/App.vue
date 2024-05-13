<script setup>
  import { onMounted } from "vue";
  import { storeToRefs } from "pinia";
  import { useRouter } from "vue-router";
  import { useUserStore } from "./stores/user.js";
  import { useTaskStore } from "./stores/task.js";

  const router = useRouter();
  const userStore = useUserStore();
  const taskStore = useTaskStore();
  const { tasks } = storeToRefs(taskStore);
  const { user } = storeToRefs(userStore);

  onMounted(async () => {
    try {
      await userStore.fetchUser(); // here we call fetch user
      const currentPath = router.currentRoute.value.path; // Obtiene la ruta actual
      if (!user.value) {
         // Si no hay usuario, redirige a la página de autenticación
        router.push({ path: "/auth" });
      } else {
        // Si hay usuario autenticado
        if (currentPath === "/auth") {
          // Redirige al dashboard si el usuario está en la página de autenticación,
          // indicando que el usuario ya estaba autenticado pero intentó ir a /auth
          router.push({ path: "/" });
        } else {
          // Si el usuario está autenticado y se encuentra en cualquier otra ruta 
          // No hace falta redirigir, simplemente continúa como está
          await taskStore.fetchTasks();
        }
      }
    } catch (e) {
      console.log(e);
    }
  });
</script>

<template>
  <section>
    <router-view />
    <!-- your routes will load inside of these tags -->
  </section>
</template>
