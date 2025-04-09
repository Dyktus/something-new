<script setup>
import { ref, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useMainStore } from '@/stores/main';

const router = useRouter();
const route = useRoute();
const mainStore = useMainStore();

const userName = ref('Jan Kowalski');
const userInitials = computed(() => {
  return userName.value
    .split(' ')
    .map(name => name[0])
    .join('')
    .toUpperCase();
});

// Aktualnie otwarta strona
const currentPage = computed(() => {
  const path = route.path;

  if (path === '/dashboard') return 'Strona główna';
  if (path === '/dashboard/page1') return 'Page 1';
  if (path === '/dashboard/page2') return 'Page 2';
  if (path === '/dashboard/page3') return 'Page 3';

  return 'Dashboard';
});

// Obsługa wylogowania
const handleLogout = async () => {
  try {
    router.push('/logout');
  } catch (error) {
  }
};
</script>
<template>
  <div class="dashboard-container">
    <!-- Sidebar / Menu boczne -->
    <div class="sidebar">
      <div class="logo-container">
        <router-link to="/dashboard" class="logo">
          <span class="logo-icon">🌿</span>
          <span class="logo-text">SaaSy</span>
        </router-link>
      </div>

      <nav class="menu">
        <router-link to="/" class="menu-item" active-class="active">
          <span class="menu-icon">🏠</span>
          <span class="menu-text">Strona główna</span>
        </router-link>

        <router-link to="/profile" class="menu-item" active-class="active">
          <span class="menu-icon">👥</span>
          <span class="menu-text">Profil</span>
        </router-link>

<!--        <router-link to="/dashboard/page2" class="menu-item" active-class="active">-->
<!--          <span class="menu-icon">📝</span>-->
<!--          <span class="menu-text">Page 2</span>-->
<!--        </router-link>-->

<!--        <router-link to="/dashboard/page3" class="menu-item" active-class="active">-->
<!--          <span class="menu-icon">👥</span>-->
<!--          <span class="menu-text">Page 3</span>-->
<!--        </router-link>-->
      </nav>

      <div class="logout-container">
        <button @click="handleLogout" class="logout-button">
          <span class="logout-icon">🚪</span>
          <span class="logout-text">Wyloguj</span>
        </button>
      </div>
    </div>

    <!-- Main Content / Główna zawartość -->
    <div class="main-content">
      <div class="top-bar">
        <div class="current-page">{{ currentPage }}</div>
        <div class="user-info">
          <span class="user-name">{{ userName }}</span>
          <div class="user-avatar">{{ userInitials }}</div>
        </div>
      </div>

      <div class="content-area">
        <slot/>
      </div>
    </div>
  </div>
</template>
