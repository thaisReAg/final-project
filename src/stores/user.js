import { defineStore } from "pinia";
import { supabase } from "../supabase";
import router from "@/router";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null,
    errorMessage: "",
    username: "",
    notificationMessage: "",
  }),

  actions: {
    async fetchUser() {
      const user = await supabase.auth.getUser();
      this.user = user;
    },

    async signUp(email, password, username) {
      try {
        const { user, error } = await supabase.auth.signUp({
          email: email,
          password: password,
        });

        if (error) {
          this.notificationMessage = `Error en el registro: ${error.message}`;
        } else if (user) {
          this.username = username; // Asumiendo que quieres hacer algo con el username aquí.
          this.user = user; // Suponiendo que quieres almacenar la información del usuario registrado.
          this.notificationMessage = "Registro exitoso. Por favor, verifica tu correo electrónico.";
        }
      } catch (error) {
        // En caso de que haya un error no capturado por la respuesta de Supabase
        this.notificationMessage = `Error inesperado: ${error.message}`;
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
    },

    async signOut() {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("Logout failed:", error);
      } else {
        router.push("/auth");
      }
    },
    setUsername(name) {
      this.username = name;
    },
    clearNotification() {
      this.notificationMessage = ''; // Limpia el mensaje de notificación
    }
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
