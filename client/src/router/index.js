import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '@/views/HomeView.vue'
import ProfileView from "@/views/features/user/ProfileView.vue";
import LoginView from "@/views/features/user/LoginView.vue";
import RegisterView from "@/views/features/user/RegisterView.vue";
import LogoutView from "@/views/features/user/LogoutView.vue";
import TeamView from "@/views/features/team/TeamView.vue";

const routes = [
  {
    meta: {
      title: 'Dashboard',
      requiresAuth: true,
    },
    path: '/',
    name: 'dashboard',
    component: Home,
  },
  {
    meta: {
      title: 'My profile',
      requiresAuth: true,
    },
    path: '/profile',
    name: 'profile',
    component: ProfileView,
  },
  {
    meta: {
      title: 'My team',
      requiresAuth: true,
    },
    path: '/team/:id',
    name: 'team',
    component: TeamView,
  },
  {
    meta: {
      title: 'Login',
      requiresAuth: false,
    },
    path: '/login',
    name: 'login',
    component: LoginView,
  },
  {
    meta: {
      title: 'Register',
      requiresAuth: false,
    },
    path: '/register',
    name: 'register',
    component: RegisterView,
  },
  {
    meta: {
      title: 'Logout',
      requiresAuth: false,
    },
    path: '/logout',
    name: 'logout',
    component: LogoutView,
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { top: 0 }
  },
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('apiToken')

  if (to.meta.requiresAuth && !isAuthenticated) {
    console.log(`You are not logged so I get you out...`)
    next('/login')
  } else {
    next()
  }
})

export default router
