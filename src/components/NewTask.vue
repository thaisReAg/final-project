<script setup>
  import { ref, onMounted } from "vue";
  import { useTaskStore } from "../stores/task.js";
  import { useUserStore } from "../stores/user.js";
  import { storeToRefs } from "pinia";
  import TaskCard from "./TaskCard.vue";

  const taskStore = useTaskStore();

  const taskTitle = ref("");
  const taskDescription = ref("");
  const errorMessage = ref("");
  const { tasks } = storeToRefs(taskStore);

  onMounted(async () => {
    await taskStore.fetchTasks();
    tasks.value = taskStore.tasks;
  });

  const addNewTask = async () => {
    errorMessage.value = "";
    if ((taskTitle.value.trim(), taskDescription.value.trim)) {
      try {
        await taskStore.newTask(taskTitle.value, taskDescription.value);
        taskTitle.value = "";
        taskDescription.value = "";
        await taskStore.fetchTasks();
      } catch (error) {
        errorMessage.value = error.message;
      }
    }
  };
  async function deleteTask(taskId) {
  await taskStore.deleteTask(taskId);
}
</script>

<template>
  <div>
    <form @submit.prevent="addNewTask">
      <input
        v-model="taskTitle"
        placeholder="Título de la tarea" />
      <textarea
        v-model="taskDescription"
        placeholder="Descripción de la tarea" />
      <button type="submit">Añadir Tarea</button>
      <p
        v-if="errorMessage"
        class="error-message">
        {{ errorMessage }}
      </p>
    </form>
  </div>
  <div
    v-for="task in tasks"
    :key="task.id"
    class="task">
    <TaskCard :task="task" @delete-task="deleteTask" />
  </div>
</template>

<style lang="scss" scoped>
  @import "../assets/_styles.scss";
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin: 20px 0;
    gap: 5px;
    input,
    textarea {
      width: 400px;
      border: 3px solid $secondary-color;
      padding: 20px;
      border-radius: 4px;
      &:hover {
        border-color: darken($secondary-color, 30%);
      }
      &:focus {
        outline: none;
        border-color: $primary-color; // Naranja
      }
    }
    button {
      width: 400px;
      padding: 10px;
      background-color: $primary-color;
      border: none;
      color: $white;
      border-radius: 4px;
      cursor: pointer;
      transition: background-color 0.3s ease;

      &:hover {
        background-color: lighten($primary-color, 10%);
      }
    }
  }
  .error-message {
    color: $error-color;
    /* Otros estilos para tu mensaje de error aquí */
  }
</style>
