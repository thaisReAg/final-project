<script setup>
  import { useTaskStore } from "@/stores/task";
  import { TrashIcon } from "@heroicons/vue/24/outline";

  const taskStore = useTaskStore();
  const props = defineProps({
    task: Object,
  });
  const emits = defineEmits(["delete-task"]);
  function deleteTask(taskId) {
    emits("delete-task", taskId);
  }
</script>

<template>
  <section>
    <div class="task-card">
      <h3>{{ task.title }}</h3>
      <p>{{ task.description }}</p>
      <!-- Botón de borrar -->
      <button @click="deleteTask(task.id)"><TrashIcon class="size-6 text-500" /></button>
    </div>
  </section>
</template>

<style lang="scss" scoped>
  @import "../assets/_styles.scss";
  section {
    display: flex;
    justify-content: center;
    align-items: center;
    .task-card {
      display: flex;
      flex-direction: column;
      width: 600px;
      margin: 30px;
      background-color: $light-color;
      border: 1px solid $dark-color;
      border-radius: 8px;
      padding: 16px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      color: $dark-color;

      h3 {
        color: $primary-color;
        margin-bottom: 8px;
        border: 2px solid $secondary-color;
      }

      p {
        color: $dark-color;
      }
    }
  }
</style>
