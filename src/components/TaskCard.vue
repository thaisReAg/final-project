<script setup>
  import { TrashIcon, PencilSquareIcon } from "@heroicons/vue/24/outline";
  import { ref } from "vue";
  import { useTaskStore } from "../stores/task.js";

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
      month: "numeric",
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

  /* ---- EDITAR STATUS ---- */
  // Este ref almacena el estado seleccionado actualmente
  const selectedStatus = ref(props.task.status);

  const taskStore = useTaskStore();

  async function updateTaskStatus(taskId) {
    await taskStore.updateTaskStatus(taskId, selectedStatus.value);
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

      <div class="icon-container">
        <p class="date">Creada: {{ formattedDate(task.inserted_at) }}</p>
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
        <!-- Botón de editar status -->
        <select
          v-model="selectedStatus"
          @change="updateTaskStatus(task.id)">
          <option value="not_started">No Iniciada</option>
          <option value="in_progress">En Progreso</option>
          <option value="completed">Completada</option>
        </select>
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
    flex-wrap: wrap;
    justify-content: space-around;
    margin: 20px 0;
    position: relative;
    .task-card {
      background-color: $light-color;
    border: 1px solid $secondary-color;
    border-radius: 12px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
   
    padding: 20px;
    width: 100%;
    transition: transform 0.3s, z-index 0.3s;
    position: relative;
      &:hover {
        transform: scale(1.05);
      }
      
      .title {
        font-size: 1.5em;
        color: $primary-color;
        margin-bottom: 10px;
      }

      .description {
        font-size: 1em;
        color: $dark-color;
        margin-bottom: 20px;
      }

      .icon-container {
        display: flex;
        justify-content: space-between;
        align-items: center;

        p.date {
          font-size: 0.9em;
          color: $dark-color;
        }

        button {
          background: none;
          border: none;
          cursor: pointer;

          .icon {
            fill: $primary-color;
            transition: fill 0.3s;

            &:hover {
              fill: darken($primary-color, 15%);
            }
          }
        }

        select {
          background-color: $light-color; /* Crema */
          color: $dark-color; /* Negro */
          border: 2px solid $primary-color; /* Naranja */
          padding: 8px 12px;
          border-radius: 4px;
          outline: none;
          

          &:hover {
            border-color: $secondary-color; /* TURQUESA */
          }

          &:focus {
            border-color: $secondary-color; /* TURQUESA */
            box-shadow: 0 0 8px 0 rgba(84, 222, 167, 0.5); /* Sombra suave */
          }

          option {
            background: $light-color; /* Crema - para asegurarse de que tenga un fondo consistente */
            color: $dark-color; /* Negro - Esto determina el color del texto de las opciones */
          }
        }
      }

      &:hover .icon-container {
        display: flex;
      }

      &.editable {
        display:flex;
        flex-direction: column;
        justify-content: space-between;
        
        input,
        textarea {
          font-size: 1em;
          margin-bottom: 15px;
          padding: 10px;
          border: 2px solid $secondary-color;
          border-radius: 8px;
          background-color: rgba(255, 255, 255, 0.582);
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

        .submit-btn {
          font-size: 1em;
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

        .cancel-btn {
          font-size: 1em;
          padding: 10px 15px;
          color: $white;
          background-color: $error-color;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: background-color 0.3s, transform 0.3s;

          &:hover {
            background-color: darken($error-color, 10%);
            transform: scale(1.05);
          }

          &:active {
            background-color: darken($error-color, 20%);
          }
        }
      }
    }
  }

  @media (max-width: 768px) {
    .date {
      display: none;
    }
  }
</style>
