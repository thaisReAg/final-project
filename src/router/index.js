import { createRouter, createWebHistory } from "vue-router";
// import Dashboard from '../views/Dashboard.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/Dashboard.vue"),
    },
    {
      path: "/auth",
      name: "auth",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/Auth.vue"),
    },
    {
      path: "/profile",
      name: "Profile",
      component: () => import("../views/UserProfile.vue"),
    },
    {
      path: '/pomodoro',
      name: 'Pomodoro',
      component: () => import("../views/Pomodoro.vue"),
    },
  ],
});

export default router;
