<script setup>
import { useRouter } from 'vue-router'
import LayoutGuest from '@/layouts/LayoutGuest.vue'
import api from "@/api.js";

const router = useRouter()

api.removeToken();

router.push('/login')

</script>

<template>
  <LayoutGuest>

  </LayoutGuest>
</template>
