<script setup>
  import { ref, computed } from "vue";
  import { useTaskStore } from "../stores/task.js";
  import { useUserStore } from "../stores/user.js";
  import { storeToRefs } from "pinia";
  import TaskCard from "./TaskCard.vue";

  const taskStore = useTaskStore();
  const userStore = useUserStore();

  const taskTitle = ref("");
  const taskDescription = ref("");
  const errorMessage = ref("");
  const { tasks } = storeToRefs(taskStore);

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
  /* ELIMINAR TASK */
  async function deleteTask(taskId) {
    await taskStore.deleteTask(taskId);
  }

  /* EDITAR TASK */
  const editTask = (id, updateFields) => {
    taskStore.editTask(id, updateFields);
  };

  /* EDITAR STATUS TASK */

  const updateTaskStatus = (taskId, newStatus) => {
    taskStore.updateTaskStatus(taskId, newStatus);
  };
  const notStartedTasks = computed(() => {
    return tasks.value.filter((task) => task.status === "not_started");
  });

  const inProgressTasks = computed(() => {
    return tasks.value.filter((task) => task.status === "in_progress");
  });

  const completedTasks = computed(() => {
    return tasks.value.filter((task) => task.status === "completed");
  });
</script>

<template>
  <section>
    <article class="form-art">
      <div class="form-container">
        <form @submit.prevent="addNewTask">
          <input
            v-model="taskTitle"
            placeholder="Task title"
             />
          <textarea
            v-model="taskDescription"
            placeholder="Task description" />
          <button type="submit">Add task</button>
          <p
            v-if="errorMessage"
            class="error-message">
            {{ errorMessage }}
          </p>
        </form>
      </div>
    </article>
    <article class="task-art">
      <div class="tasks-container">
        <div class="task-column">
          <h2>Not started</h2>
          <div
            v-for="task in notStartedTasks"
            :key="task.id">
            <TaskCard
              :task="task"
              @delete-task="deleteTask"
              @edit-task="editTask"
              @update-task-status="updateTaskStatus" />
          </div>
        </div>
        <div class="task-column">
          <h2>In progress</h2>
          <div
            v-for="task in inProgressTasks"
            :key="task.id">
            <TaskCard
              :task="task"
              @delete-task="deleteTask"
              @edit-task="editTask"
              @update-task-status="updateTaskStatus" />
          </div>
        </div>
        <div class="task-column">
          <h2>Completed</h2>
          <div
            v-for="task in completedTasks"
            :key="task.id">
            <TaskCard
              :task="task"
              @delete-task="deleteTask"
              @edit-task="editTask"
              @update-task-status="updateTaskStatus" />
          </div>
        </div>
      </div>
    </article>
  </section>
</template>

<style lang="scss" scoped>
  @import "../assets/_styles.scss";
  .form-art {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    .form-container {
      background-color: $white;
      padding: 20px 30px;
      border-radius: 12px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      width: 100%;
      max-width: 500px;
      form {
        display: flex;
        flex-direction: column;
        width: 100%;
        input,
        textarea {
          font-size: 1em;
          margin-bottom: 15px;
          padding: 10px;
          border: 2px solid $secondary-color;
          border-radius: 8px;
          background-color: $light-color;
          color: $dark-color;
          transition: border-color 0.3s, box-shadow 0.3s;

          &:hover {
            border-color: darken($secondary-color, 10%);
          }

          &:focus {
            border-color: $primary-color;
            box-shadow: 0 0 8px rgba($primary-color, 0.5);
            outline: none;
          }
        }

        button {
          font-size: 1.2em;
          padding: 10px 15px;
          color: $white;
          background-color: $primary-color;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: background-color 0.3s, transform 0.3s;

          &:hover {
            background-color: darken($primary-color, 10%);
            transform: scale(1.05);
          }

          &:active {
            background-color: darken($primary-color, 20%);
          }
        }

        .error-message {
          color: $error-color;
          font-size: 0.9em;
          margin-top: 10px;
          text-align: center;
        }
      }
    }
  }

  .error-message {
    color: $error-color;
    /* Otros estilos para tu mensaje de error aquí */
  }
  .task-art {
    width: 100%;
    .tasks-container {
      display: flex;
      justify-content: space-evenly;
      flex-wrap: wrap;
      gap: 30px;
      margin: 30px;
      .task-column {
        display: flex;
        flex-direction: column;
        width: 500px;
        h2 {
          align-self: center;
          font-size: 24px;
          font-weight: bold;
          color: $primary-color;
        }
      }
    }
  }
  @media (max-width: 768px) {
    .task-column {
      display: flex;
      flex-direction: column;
      width: 100%;
      h2 {
        align-self: center;
        font-size: 24px;
        font-weight: bold;
        color: $primary-color;
      }
    }
  }
  @media (max-width: 425px) {
    .form-art {
      margin: 10px;
    }
  }
</style>
