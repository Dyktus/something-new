<script setup>
import {reactive} from 'vue'
import {useMainStore} from '@/stores/main'
import {mdiAccount, mdiAsterisk, mdiFormTextboxPassword} from '@mdi/js'
import SectionMain from '@/components/SectionMain.vue'
import CardBox from '@/components/CardBox.vue'
import BaseDivider from '@/components/BaseDivider.vue'
import FormField from '@/components/FormField.vue'
import FormControl from '@/components/FormControl.vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseButtons from '@/components/BaseButtons.vue'
import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue'
import api from "@/api.js";

const mainStore = useMainStore()

const form = reactive({
  email: '',
  teams: [],
  ownTeamId: ''
})

const profileFor = reactive({
  email: form.email,
  teams: form.teams,
  ownTeamId: form.ownTeamId
})

const loadData = async () => {
  const response = await api.get('/profile');
  profileFor.email = response.email;
  profileFor.teams = response.teams;
  profileFor.ownTeamId = response.ownTeamId;
};

loadData();

const passwordForm = reactive({
  password_current: '',
  password: '',
  password_confirmation: '',
})

const submitProfile = () => {
  mainStore.setUser(profileForm)
}

const submitPass = () => {
  //
}
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <h1 class="text-2xl">
        Witaj, <b>{{ profileFor.email }}</b
      >!
      </h1>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CardBox is-form @submit.prevent="submitProfile">
          <FormField label="Name" help="Required. Your email address">
            <FormControl
              v-model="profileFor.email"
              :icon="mdiAccount"
              name="email"
              required
              autocomplete="email"
            />
          </FormField>

          <table>
            <thead>
              <tr>
                <th>Your teams</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="team in profileFor.teams">
                <td v-if="team.id === profileFor.ownTeamId">
                  <router-link :to="{ name: 'team', params: { id: team.id } }">
                    {{ team.name }}
                  </router-link>
                </td>
                <td v-else>
                  {{ team.name }}
                </td>
              </tr>
            </tbody>
          </table>
          <template #footer>
            <BaseButtons>
              <BaseButton color="info" type="submit" label="Submit"/>
            </BaseButtons>
          </template>
        </CardBox>

        <CardBox is-form @submit.prevent="submitPass">
          <FormField label="Current password" help="Required. Your current password">
            <FormControl
              v-model="passwordForm.password_current"
              :icon="mdiAsterisk"
              name="password_current"
              type="password"
              required
              autocomplete="current-password"
            />
          </FormField>

          <BaseDivider/>

          <FormField label="New password" help="Required. New password">
            <FormControl
              v-model="passwordForm.password"
              :icon="mdiFormTextboxPassword"
              name="password"
              type="password"
              required
              autocomplete="new-password"
            />
          </FormField>

          <FormField label="Confirm password" help="Required. New password one more time">
            <FormControl
              v-model="passwordForm.password_confirmation"
              :icon="mdiFormTextboxPassword"
              name="password_confirmation"
              type="password"
              required
              autocomplete="new-password"
            />
          </FormField>

          <template #footer>
            <BaseButtons>
              <BaseButton type="submit" color="info" label="Update password"/>
            </BaseButtons>
          </template>
        </CardBox>
      </div>
    </SectionMain>
  </LayoutAuthenticated>
</template>
