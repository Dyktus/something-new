import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '@/views/HomeView.vue'
import ProfileView from "@/views/features/user/ProfileView.vue";
import LoginView from "@/views/features/user/LoginView.vue";
import LogoutView from "@/views/features/user/LogoutView.vue";
import TeamView from "@/views/features/team/TeamView.vue";
import NewRegisterView from "@/views/features/user/NewRegisterView.vue";
import ForgotPassword from "@/views/features/user/ForgotPassword.vue";
import ResetPassword from "@/views/features/user/ResetPassword.vue";

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
    component: NewRegisterView,
  },
  {
    meta: {
      title: 'Forgot password',
      requiresAuth: false,
    },
    path: '/forgot-password',
    name: 'forgot-password',
    component: ForgotPassword,
  },

  {
    meta: {
      title: 'Reset password',
      requiresAuth: false,
    },
    path: '/reset-password',
    name: 'reset-password',
    component: ResetPassword,
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
