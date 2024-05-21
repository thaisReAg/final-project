<script setup>
  import { useUserStore } from "../stores/user.js";
  import { onMounted, ref } from "vue";
  import { PencilSquareIcon } from "@heroicons/vue/24/outline";

  const userStore = useUserStore();
  const isEditing = ref(false);

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
      <div v-if="userStore.loading">Loading profile...</div>
      <div
        class="user-profile"
        v-else-if="userStore.profile && !userStore.error"
        v-if="!isEditing">
        <h2>User profile</h2>
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
          <strong class="strong">Username:</strong>
          {{ userStore.profile.username }}
        </p>
        <p>
          <strong class="strong">Email:</strong> {{ userStore.profile.email }}
        </p>
        <p>
          <strong class="strong">Website: </strong>
          <a :href="userStore.profile.website">{{
            userStore.profile.website
          }}</a>
        </p>
        <p>
          <strong class="strong">Bio: </strong>
          {{ userStore.profile.biography }}
        </p>
        <button
          @click="toggleEdit"
          class="icon">
          <PencilSquareIcon class="size-6 text-500 icon" />
        </button>
      </div>
      <div
        v-else
        class="error">
        {{ userStore.error ? userStore.error : "No profile data available." }}
      </div>
      <div
        v-if="isEditing"
        class="user-profile editable">
        <img
          v-if="userStore.profile.avatar_url"
          :src="userStore.profile.avatar_url"
          alt="Avatar"
          class="profile-avatar" />
        <strong class="strong">URL avatar:</strong
        ><input
          type="text"
          v-model="userStore.profile.avatar_url" />

        <strong class="strong">Name:</strong>
        <input v-model="userStore.profile.name" />

        <strong class="strong">Username:</strong>
        <input v-model="userStore.profile.username" />

        <strong class="strong">Email:</strong>
        <input
          type="email"
          v-model="userStore.profile.email" />

        <strong class="strong">Website:</strong
        ><input
          type="text"
          v-model="userStore.profile.website" />
        <a :href="userStore.profile.website"></a>

        <strong class="strong">Bio:</strong>
        <textarea
          v-model="userStore.profile.biography"
          rows="3"></textarea>
        <div class="btn">
          <button
            class="submit-btn"
            @click="saveProfile">
            Save changes
          </button>
          <button
            class="cancel-btn"
            @click="toggleEdit">
            Cancel
          </button>
        </div>
      </div>
    </div>
  </section>
</template>
<style lang="scss" scoped>
  @import "../assets/_styles.scss";
  .profile-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    .user-profile {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin: 40px;
      background: $light-color;
      border: 1px solid $secondary-color;
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

      p,
      input,
      textarea {
        color: $dark-color;
        width: 100%;
        background-color: white;
        margin-bottom: 10px;
        text-align: center;
        padding: 10px;
        border: 1px solid $secondary-color;
        border-radius: 5px;
        &:hover {
          border-color: darken($secondary-color, 10%);
        }

        &:focus {
          border-color: $primary-color;
          box-shadow: 0 0 8px rgba($primary-color, 0.5);
          outline: none;
        }
        a {
          color: $primary-color;
          text-decoration: none;
          &:hover {
            text-decoration: underline;
          }
        }
      }
      .icon {
        stroke: $primary-color;
        transition: stroke 0.3s;

        &:hover {
          stroke: darken($primary-color, 15%);
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
      .btn {
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-around;
        gap: 10px;
        button {
          font-size: 1.2em;
          padding: 10px 15px;
          color: $white;
          border: none;

          border-radius: 8px;
          cursor: pointer;
          transition: background-color 0.3s, transform 0.3s;
          &:hover {
            transform: scale(1.05);
          }
        }
        .cancel-btn {
          background-color: lighten($error-color, 40%);
          color: $error-color;
          &:hover {
            color: darken($error-color, 10%);
          }
        }
        .submit-btn {
          background-color: lighten($primary-color, 40%);
          color: $primary-color;
          &:hover {
            color: darken($primary-color, 10%);
          }
        }
      }
    }
  }
</style>
