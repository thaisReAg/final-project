import { defineStore } from "pinia";
import { supabase } from "../supabase";
import router from "@/router";
import { useTaskStore } from "../stores/task.js";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null,
    errorMessage: "",
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
          if (error.message.toLowerCase().includes("already")) {
            alert(
              "El correo electrónico ya está en uso. Por favor, intenta iniciar sesión o usa otro."
            );
          }
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
    async fetchProfile() {
      this.loading = true;

      const { data, error } = await supabase.from("profiles").select().single();

      if (error) {
        this.error = error.message;
      } else {
        this.profile = data;
      }

      this.loading = false;
    },
    async updateProfile(updatedProfile) {
      this.loading = true;
      try {
        const { data, error } = await supabase
          .from("profiles") // Asegúrate de que este es el nombre correcto de tu tabla
          .update({
            name: updatedProfile.name,
            username: updatedProfile.username,
            avatar_url: updatedProfile.avatar_url,
            email: updatedProfile.email,
            website: updatedProfile.website,
            biography: updatedProfile.biography,
          })
          .match({ id: updatedProfile.id }); // Suponiendo que 'id' es tu clave primaria

        if (error) throw error;

        this.profile = data[0]; // Suponiendo que 'data' contiene el perfil actualizado
        alert("Perfil actualizado con éxito");
      } catch (error) {
        alert(`Error al actualizar el perfil: ${error.message}`);
      } finally {
        this.loading = false;
      }
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
