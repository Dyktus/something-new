<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { mdiAccount, mdiAsterisk } from '@mdi/js'
import SectionFullScreen from '@/components/SectionFullScreen.vue'
import CardBox from '@/components/CardBox.vue'
import FormCheckRadio from '@/components/FormCheckRadio.vue'
import FormField from '@/components/FormField.vue'
import FormControl from '@/components/FormControl.vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseButtons from '@/components/BaseButtons.vue'
import LayoutGuest from '@/layouts/LayoutGuest.vue'
import api from "@/api.js";
import {useMainStore} from "@/stores/main.js";

const form = reactive({
  email: '',
  password: '',
  remember: true,
})

const router = useRouter()
const mainStore = useMainStore()

const submit = async () => {

  try {
    const response = await api.post('/profile/login', {
      email: form.email,
      password: form.password,
    });

    await mainStore.setUser(response);
    api.setToken(response.data.token);
    router.push('/')

    console.log('all done');
    console.log(mainStore.userEmail);
  } catch (error) {
    alert(`${error.response.data.message}`)
  }
}
</script>

<template>
  <LayoutGuest>
    <SectionFullScreen v-slot="{ cardClass }">
      <CardBox :class="cardClass" is-form @submit.prevent="submit">
        <FormField label="email" help="Please enter your email">
          <FormControl
            v-model="form.email"
            :icon="mdiAccount"
            name="email"
            autocomplete="username"
          />
        </FormField>

        <FormField label="Password" help="Please enter your password">
          <FormControl
            v-model="form.password"
            :icon="mdiAsterisk"
            type="password"
            name="password"
            autocomplete="current-password"
          />
        </FormField>

        <FormCheckRadio
          v-model="form.remember"
          name="remember"
          label="Remember"
          :input-value="true"
        />

        <template #footer>
          <BaseButtons>
            <BaseButton type="submit" color="info" label="Login" />
          </BaseButtons>
        </template>
      </CardBox>
    </SectionFullScreen>
  </LayoutGuest>
</template>
