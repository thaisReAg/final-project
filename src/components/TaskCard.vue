<script setup>
  import { TrashIcon, PencilSquareIcon } from "@heroicons/vue/24/outline";
  import { ref } from "vue";

  const props = defineProps({
    task: Object,
  });
  const localTask = ref(props.task);
  const isEditable = ref(false);
  function formattedDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES", {
      // Ajusta el locale según necesites
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }
  /* ---- ELIMINAR TASK ---- */
  const emits = defineEmits(["delete-task", "edit-task"]);
  function deleteTask(taskId) {
    // if (window.confirm("¿Estás seguro de que quieres eliminar esta tarea?")) {
    {
      emits("delete-task", taskId);
    }
  }
  /* ---- EDITAR TASK ---- */
  function editTask(taskId, task) {
    emits("edit-task", taskId, task);
    isEditable.value = !isEditable.value;
  }
</script>

<template>
  <section>
    <div
      class="task-card"
      v-if="!isEditable">
      <h3 class="title">{{ localTask.title }}</h3>
      <p
        v-if="localTask.description"
        class="description">
        {{ localTask.description }}
      </p>
      <p class="date">{{ formattedDate(task.inserted_at) }}</p>
      <div class="icon-container">
        <!-- Botón de editar -->
        <button
          @click="
            () => {
              isEditable = !isEditable;
            }
          ">
          <PencilSquareIcon class="size-6 text-500 icon" />
        </button>
        <!-- Botón de borrar -->

        <button @click="deleteTask(task.id)">
          <TrashIcon class="size-6 text-500 icon" />
        </button>
      </div>
    </div>
    <div
      class="task-card editable"
      v-if="isEditable">
      <!-- Campos editables -->
      <input
        v-model="localTask.title"
        placeholder="Título" />
      <textarea
        v-model="localTask.description"
        placeholder="Descripción"></textarea>

      <!-- Botón para guardar cambios -->
      <button
        class="submit-btn"
        @click="editTask(task.id, localTask)">
        Guardar cambios
      </button>
      <button
        class="cancel-btn"
        @click="
          () => {
            isEditable = !isEditable;
          }
        ">
        Cancelar
      </button>
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
      .title,
      input {
        color: $primary-color;
        background-color: #fff;
        margin-bottom: 8px;
        border: 2px solid $secondary-color;
        padding: 10px;
      }
      .description,
      textarea {
        color: $dark-color;
        background-color: $white;
        border-radius: 5px;
        padding: 10px;
        border: 2px solid $secondary-color;
      }
      .date {
        margin-top: 20px;
        align-self: flex-end;
      }
      .icon-container {
        display: flex;
        justify-content: space-around;
        align-items: center;
        margin-top: 20px;
      }
      .submit-btn {
        margin: 10px 0;
        padding: 8px 15px;
        background-color: $secondary-color; // Verde
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        margin-right: 5px;

        &:hover {
          background-color: darken(
            $secondary-color,
            20%
          ); // Un verde un poco más oscuro para el hover
        }
      }
      .cancel-btn {
        padding: 8px 15px;
        background-color: $error-color;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;

        &:hover {
          background-color: darken($error-color, 10%);
        }
      }
      input,
      textarea {
        &:hover {
          border-color: darken($secondary-color, 30%);
        }
        &:focus {
          outline: none;
          border-color: $primary-color; // Naranja
        }
      }
    }
  }
</style>
