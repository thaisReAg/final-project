<script setup>
  import { useUserStore } from "../stores/user.js";
  import { onMounted, ref } from "vue";
  import { TrashIcon, PencilSquareIcon } from "@heroicons/vue/24/outline";

  const userStore = useUserStore();
  const isEditing = ref(false);
  // Opcional: Llama a fetchProfile() si es necesario cargar los datos al entrar en este componente
  onMounted(async () => {
    if (!userStore.profile) {
      await userStore.fetchProfile();
    }
  });
  function toggleEdit() {
    isEditing.value = !isEditing.value;
  }
  async function saveProfile() {
    if (isEditing.value) {
      await userStore.updateProfile(userStore.profile);
      isEditing.value = false;
    }
  }
</script>

<template>
  <section>
    <div class="profile-container">
      <div v-if="userStore.loading">Cargando perfil...</div>
      <div
        class="user-profile"
        v-else-if="userStore.profile && !userStore.error"
        v-if="!isEditing">
        <h2>Perfil del Usuario</h2>
        <!-- Mostrar la imagen de avatar si avatar_url está presente -->
        <img
          v-if="userStore.profile.avatar_url"
          :src="userStore.profile.avatar_url"
          alt="Avatar"
          class="profile-avatar" />
        <p>
          <strong class="strong">Name:</strong> {{ userStore.profile.name }}
        </p>
        <p>
          <strong class="strong">Nombre de Usuario:</strong>
          {{ userStore.profile.username }}
        </p>
        <p>
          <strong class="strong">Email:</strong> {{ userStore.profile.email }}
        </p>
        <p>
          <strong class="strong">Sitio Web: </strong>
          <a :href="userStore.profile.website">{{
            userStore.profile.website
          }}</a>
        </p>
        <p>
          <strong class="strong">Biografía: </strong>
          {{ userStore.profile.biography }}
        </p>
        <button
          @click="toggleEdit"
          class="btn">
          <PencilSquareIcon class="size-6 text-500 icon" />
        </button>
      </div>
      <div
        v-else
        class="error">
        {{
          userStore.error
            ? userStore.error
            : "No hay datos de perfil disponibles."
        }}
      </div>

      <div
        v-if="isEditing"
        class="user-profile">
        <img
          v-if="userStore.profile.avatar_url"
          :src="userStore.profile.avatar_url"
          alt="Avatar"
          class="profile-avatar" />
        <strong class="strong">URL avatar:</strong
        ><input
          type="text"
          v-model="userStore.profile.avatar_url" />

        <strong class="strong">Nombre:</strong>
        <input v-model="userStore.profile.name" />

        <strong class="strong">Nombre de Usuario:</strong>
        <input v-model="userStore.profile.username" />

        <strong class="strong">Email:</strong>
        <input
          type="email"
          v-model="userStore.profile.email" />

        <strong class="strong">Sitio Web:</strong
        ><input
          type="text"
          v-model="userStore.profile.website" />
        <a :href="userStore.profile.website"></a>

        <strong class="strong">Biografía:</strong>
        <textarea v-model="userStore.profile.biography"></textarea>
        <button
          class="submit-btn"
          @click="saveProfile">
          Guardar cambios
        </button>
        <button
          class="cancel-btn"
          @click="toggleEdit">
          Cancelar
        </button>
      </div>
    </div>
  </section>
</template>
<style lang="scss" scoped>
  @import "../assets/_styles.scss";
  .profile-container {
    width: 100vw;
    .user-profile {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin: 40px;
      background: $light-color;
      border: 1px solid $dark-color;
      padding: 20px;
      border-radius: 8px;

      h2 {
        color: $primary-color;
        margin-bottom: 15px;
        font-size: 24px;
        font-weight: 600;
      }

      .profile-avatar {
        display: block;
        margin: 0 auto 20px;
        width: 100px;
        height: 100px;
        border-radius: 5%;
        border: 3px solid $secondary-color;
        object-fit: cover;
      }

      p {
        color: $dark-color;
        margin-bottom: 10px;
        text-align: center;

        a {
          color: $primary-color;
          text-decoration: none;
          &:hover {
            text-decoration: underline;
          }
        }
      }

      .error {
        color: $error-color;
        padding: 10px;
        background-color: lighten($error-color, 40%);
        border: 1px solid $error-color;
        border-radius: 5px;
      }
      .strong {
        color: $secondary-color;
      }
      input,
      textarea {
        width: 100%;
        padding: 10px;
        border: 1px solid $dark-color;
        border-radius: 5px;
      }
    }
  }
</style>
