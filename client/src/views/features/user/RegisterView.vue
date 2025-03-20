<script setup>
import {reactive} from 'vue'
import {mdiAccount, mdiAsterisk, mdiGoogleStreetView, mdiOfficeBuilding, mdiSafe, mdiStar} from '@mdi/js'
import SectionFullScreen from '@/components/SectionFullScreen.vue'
import FormField from '@/components/FormField.vue'
import FormControl from '@/components/FormControl.vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseButtons from '@/components/BaseButtons.vue'
import LayoutGuest from '@/layouts/LayoutGuest.vue'
import * as countries from '@/data/countries.js';

const form = reactive({
  email: '',
  password: '',
  repeatPassword: '',
  teamData: {
    tax_id: '',
    companyName: '',
    street: '',
    postalCode: '',
    city: '',
    country: '',
    invoice_email: ''
  },
  subscriptionPlanId: ''
})


</script>

<template>
  <LayoutGuest>
    <SectionFullScreen v-slot="{ cardClass }">
      <div class="flex bg-gray-100">
        <div class="bg-white p-12 rounded-lg shadow-lg w-full max-w-4xl">
          <div class="grid grid-cols-2 gap-4">
            <div class="p-4">
              <FormField label="E-mail address" help="Please enter your email">
                <FormControl
                  v-model="form.email"
                  :icon="mdiAccount"
                  name="email"
                  autocomplete="email"
                />
              </FormField>
              <FormField label="Password" help="Please enter your password">
                <FormControl
                  v-model="form.email"
                  :icon="mdiStar"
                  name="password"
                  autocomplete="password"
                />
              </FormField>
              <FormField label="Repeat password" help="Please re-enter your password">
                <FormControl
                  v-model="form.email"
                  :icon="mdiStar"
                  name="repeatPassword"
                />
              </FormField>
              <!-- strip here -->
            </div>
            <div class="p-4">
              <FormField label="TAX ID" help="Please provide tax id">
                <FormControl
                  v-model="form.teamData.tax_id"
                  :icon="mdiStar"
                  name="taxid"
                />
              </FormField>
              <FormField label="Company name" help="Please provide your organisation name">
                <FormControl
                  v-model="form.teamData.companyName"
                  :icon="mdiOfficeBuilding"
                  name="companyName"
                />
              </FormField>
              <FormField label="Country" help="">
                  <FormControl v-model="form.teamData.country" :options="countries" />
              </FormField>
              <FormField label="Street and building number" help="Please provide your organisation address">
                <FormControl
                  v-model="form.teamData.street"
                  :icon="mdiGoogleStreetView"
                  placeholder="Street and building no."
                  name="street"
                />
              </FormField>
              <FormField label="City" help="Please provide your organisation address">
                <FormControl
                  v-model="form.teamData.postalCode"
                  :icon="mdiGoogleStreetView"
                  placeholder="Postal code"
                  name="postalCode"
                />
                <FormControl
                  v-model="form.teamData.city"
                  :icon="mdiGoogleStreetView"
                  placeholder="City"
                  name="postalCode"
                />
                <FormField label="Subscription invoicing e-mail address" help="If you want to receive invoices to different email">
                  <FormControl
                    v-model="form.teamData.invoice_email"
                    :icon="mdiAccount"
                    name="invoice_email"
                  />
                </FormField>
              </FormField>

            </div>
          </div>
          <BaseButtons>
            <BaseButton type="submit" color="info" label="Register"/>
          </BaseButtons>
        </div>
      </div>
    </SectionFullScreen>
  </LayoutGuest>
</template>
