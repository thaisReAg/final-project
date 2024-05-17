<script setup>
  import { useUserStore } from "../stores/user.js";
  import { useRouter } from "vue-router";
  import {
    ArrowRightOnRectangleIcon,
    HomeIcon,
    UsersIcon,
    ClockIcon,
  } from "@heroicons/vue/24/outline";

  const userStore = useUserStore();
  const router = useRouter();
</script>

<template>
  <nav class="navbar">
    <div class="container">
      <a
        href="/"
        class="navbar-brand img"
        ><img
          src="/src/assets/img/imagen2.png"
          alt=""
      /></a>
      <div class="links-container">
        <a
          href="/"
          class="navbar-brand"
          ><HomeIcon class="size-6 text-500 .navbar-brand icon"></HomeIcon
          ><span>Home</span></a
        >

        <router-link
          class="navbar-brand"
          to="/profile"
          ><UsersIcon class="size-6 text-500 .navbar-brand icon"></UsersIcon
          ><span>Profile</span></router-link
        >
        <router-link
          class="navbar-brand"
          to="/pomodoro"
          ><ClockIcon class="size-6 text-500 .navbar-brand icon"></ClockIcon
          ><span>Pomodoro</span></router-link
        >

        <button
          @click="userStore.signOut()"
          class="navbar-brand signout">
          <span> LogOut</span>
          <ArrowRightOnRectangleIcon
            class="size-6 text-500 .navbar-brand icon"
            @click="userStore.signOut()">
          </ArrowRightOnRectangleIcon>
        </button>
      </div>
    </div>
  </nav>
</template>

<style scoped lang="scss">
  @import "../assets/_styles.scss";
  .navbar {
    background-color: $primary-color;
    .container {
      display: flex;
      justify-content: space-around;
      align-items: center;
      max-width: 100%;

      .navbar-brand {
        font-size: 20px;
        color: #fff;
        text-decoration: none;
        padding: 10px 20px;
        border-radius: 5px;
        transition: background-color 0.3s ease;

        &:hover {
          background-color: $secondary-color; // Verde
        }
        img {
          width: 50px;
          object-fit: cover;
        }
      }
      .links-container {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        .icon {
          display: none;
        }
      }
    }
  }
  @media (max-width: 525px) {
    .img {
      display: none;
    }
    .navbar {
      .container {
        .links-container {
          display: flex;
          justify-content: space-between;
          margin: 15px 0;
        
          span {
            display: none;
          }
          .icon {
            display: block;
            stroke: $white;
          }
        }
      }
    }
  }
</style>
