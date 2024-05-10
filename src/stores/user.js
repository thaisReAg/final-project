import { defineStore } from "pinia";
import { supabase } from "../supabase";
import router from "@/router";
import { useTaskStore } from "../stores/task.js";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null,
    errorMessage: "",
    username: "",
  }),

  actions: {
    async fetchUser() {
      const { data, error } = await supabase.auth.getUser();
      this.user = data.user;
    },

    async signUp(email, password, username) {
      try {
        const { user, error } = await supabase.auth.signUp({
          email: email,
          password: password,
        });

        if (error) {
          console.error("Error durante el registro:", error);
        } else if (user) {
          this.username = username; // Asumiendo que quieres hacer algo con el username aquí.
          this.user = user; // Suponiendo que quieres almacenar la información del usuario registrado.
          alert(
            "Successful registration. Check your email to verify your account."
          ); // Avisa al usuario para verificar su correo
        }
      } catch (error) {
        // En caso de que haya un error no capturado por la respuesta de Supabase
        console.error("Error inesperado:", error);
      }
    },

    async signIn(email, password) {
      this.errorMessage = "";
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });
      if (error) {
        this.errorMessage = "Email or password is incorrect. Try again.";
        return;
      }
      if (data) this.user = data.user;
      router.push("/");
      const taskStore = useTaskStore();
      await taskStore.fetchTasks();
    },

    async signOut() {
      const { error } = await supabase.auth.signOut();
      location.reload();
      if (error) {
        console.error("Logout failed:", error);
      } else {
        router.push("/auth");
      }
    },
    setUsername(name) {
      this.username = name;
    },
  },

  persist: {
    enabled: true,
    strategies: [
      {
        key: "user",
        storage: localStorage,
      },
    ],
  },
});
