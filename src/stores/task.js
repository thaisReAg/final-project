import { defineStore } from "pinia";
import { supabase } from "../supabase";
import { useUserStore } from "../stores/user.js";

export const useTaskStore = defineStore("tasks", {
  state: () => ({
    tasks: null,
  }),
  actions: {
    async fetchTasks() {
      const { data: tasks } = await supabase
        .from("tasks")
        .select(`*`)
        .eq("user_id", useUserStore().user.id)
        .order("id", { ascending: false });
      // this.tasks = tasks.filter((task) => {
      //   console.log(task.user_id === useUserStore().user.id);
      //   task.user_id === useUserStore().user.id;
      // });
      this.tasks = tasks;
    },

    async newTask(title, description) {
      // console.log(useUserStore().user.id);
      try {
        const userStore = useUserStore(); // Obteniendo la store de usuario
        const { data, error } = await supabase.from("tasks").insert({
          user_id: userStore.user.id,
          title: title,
          description: description,
          is_complete: false,
          status: "not_started",
        });

        if (error) {
          console.error("Error adding task:", error.message);
          // Lanza un error específico según el mensaje de error de Supabase
          if (error.message.includes("violates check constraint")) {
            throw new Error("El título de la tarea es muy corto.");
          } else {
            // Lanza un error genérico para otros tipos de errores
            throw new Error("Error al añadir la tarea.");
          }
        }
      } catch (err) {
        // Relanza el error para manejarlo en el componente
        throw err;
      }
    },
    //función para borrar la tarea
    async deleteTask(taskId) {
      const { error } = await supabase
        .from("tasks")
        .delete()
        .match({ id: taskId });
      if (error) {
        console.error("Error deleting task:", error.message);
        return;
      }
      // Actualizar el estado local eliminando la tarea del array tasks
      this.tasks = this.tasks.filter((task) => task.id !== taskId);
    },
    //función para editar la tarea
    async editTask(id, { title, description, status }) {
      try {
        const { error } = await supabase
          .from("tasks")
          .update({ title, description, status })
          .match({ id });
      } catch (error) {
        console.error("Error updating task:", error.message);
      }
    },
  },
});
