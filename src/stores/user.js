import { defineStore } from "pinia";
import { supabase } from "../supabase";
import router from "@/router";
import { useTaskStore } from "../stores/task.js";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null,
    username: "",
    errorMessage: "",
  }),

  actions: {
    async fetchUser() {
      const { data, error } = await supabase.auth.getUser();
      this.user = data.user;
    },

    async signUp(email, password, username) {
      try {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          username,
        });

        if (error) {
          console.error("Error durante el registro:", error);
          this.errorMessage = "Error durante el registro: " + error.message;
        } else {
          alert(
            "Successful registration. Check your email to verify your account."
          );
          await this.createProfileForUser(data.user, username);
          this.profile = {
            user_id: data.user.id,
            email: data.user.email,
            username: username || "",
          };
          this.errorMessage = ""; 
        }
      } catch (error) {
        console.error("Unexpected error:", error);
        this.errorMessage = "An unexpected error occurred:" + error.message;
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
    async createProfileForUser(user, username) {
      const { data, error } = await supabase
        .from("profiles")
        .insert([
          { user_id: user.id, email: user.email, username: username },
        ]);

      if (error) {
        console.error("Profile creation error:", error);
        throw error;
      }
      return data;
    },

    async fetchProfile() {
      this.loading = true;
      try {
        const { data: user } = await supabase.auth.getUser();
        const userId = user?.user?.id;

        if (!userId) {
          this.error = "No hay usuario autenticado";
          return;
        }

        const { data, error } = await supabase
          .from("profiles")
          .select()
          .eq("user_id", userId)
          .single();

        if (error) {
          this.error = error.message;
        } else {
          this.profile = data;
        }
      } catch (error) {
        this.error = "Error inesperado: " + error.message;
      } finally {
        this.loading = false;
      }
    },
    async updateProfile(updatedProfile) {
      try {
        const { data, error } = await supabase
          .from("profiles")
          .update(updatedProfile)
          .match({ id: updatedProfile.id });

        if (error) throw error;

        alert("Perfil actualizado con éxito");
      } catch (error) {
        alert(`Error al actualizar el perfil: ${error.message}`);
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
