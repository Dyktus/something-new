<template>
  <div class="register-container">
    <div class="register-modal">
      <h1>Zarejestruj się</h1>
      <Form @submit="onSubmit" :validation-schema="schema" v-slot="{ errors }">
        <div class="form-columns">
          <div class="column left-column">
            <div class="form-group" :class="{ 'has-error': errors.email }">
              <label for="email">E-mail</label>
              <Field
                type="email"
                id="email"
                name="email"
                placeholder="Twój adres email"
              />
              <ErrorMessage name="email" class="error-message" />
            </div>

            <div class="form-group" :class="{ 'has-error': errors.password }">
              <label for="password">Hasło</label>
              <Field
                type="password"
                id="password"
                name="password"
                placeholder="Utwórz hasło"
              />
              <ErrorMessage name="password" class="error-message" />
            </div>

            <div class="form-group" :class="{ 'has-error': errors.repeatPassword }">
              <label for="repeatPassword">Powtórz hasło</label>
              <Field
                type="password"
                id="repeatPassword"
                name="repeatPassword"
                placeholder="Powtórz hasło"
              />
              <ErrorMessage name="repeatPassword" class="error-message" />
            </div>
            <div class="form-group subscription-group">
              <label class="label-block">Wybierz subskrypcję</label>
              <div class="radio-options">
                <div class="radio-option">
                  <Field
                    type="radio"
                    id="subscription1"
                    name="subscriptionPlanId"
                    value="c1b2dfe2-1f7c-4b90-97aa-12aab3b93a99"
                  />
                  <label for="subscription1">Subskrypcja 1</label>
                </div>

                <div class="radio-option">
                  <Field
                    type="radio"
                    id="subscription2"
                    name="subscriptionPlanId"
                    value="79b99c68-82ee-4e88-b222-8c80a979401e"
                  />
                  <label for="subscription2">Subskrypcja 2</label>
                </div>

                <div class="radio-option">
                  <Field
                    type="radio"
                    id="subscription3"
                    name="subscriptionPlanId"
                    value="e82a8454-4cf1-4944-9d7c-c6fbe7c169aa"
                  />
                  <label for="subscription3">Subskrypcja 3</label>
                </div>
              </div>
              <ErrorMessage name="subscriptionPlanId" class="error-message" />
            </div>
          </div>

          <div class="column right-column">
            <div class="form-group" :class="{ 'has-error': errors['teamData.tax_id'] }">
              <label for="tax_id">NIP</label>
              <Field
                type="text"
                id="tax_id"
                name="teamData.tax_id"
                placeholder="Numer NIP"
              />
              <ErrorMessage name="teamData.tax_id" class="error-message" />
            </div>

            <div class="form-group" :class="{ 'has-error': errors['teamData.companyName'] }">
              <label for="companyName">Nazwa firmy</label>
              <Field
                type="text"
                id="companyName"
                name="teamData.companyName"
                placeholder="Nazwa firmy"
              />
              <ErrorMessage name="teamData.companyName" class="error-message" />
            </div>

            <div class="form-group" :class="{ 'has-error': errors['teamData.street'] }">
              <label for="street">Ulica</label>
              <Field
                type="text"
                id="street"
                name="teamData.street"
                placeholder="Ulica i numer"
              />
              <ErrorMessage name="teamData.street" class="error-message" />
            </div>

            <div class="form-row">
              <div class="form-group" :class="{ 'has-error': errors['teamData.postalCode'] }">
                <label for="postalCode">Kod pocztowy</label>
                <Field
                  type="text"
                  id="postalCode"
                  name="teamData.postalCode"
                  placeholder="Kod pocztowy"
                />
                <ErrorMessage name="teamData.postalCode" class="error-message" />
              </div>

              <div class="form-group" :class="{ 'has-error': errors['teamData.city'] }">
                <label for="city">Miasto</label>
                <Field
                  type="text"
                  id="city"
                  name="teamData.city"
                  placeholder="Miasto"
                />
                <ErrorMessage name="teamData.city" class="error-message" />
              </div>
            </div>

            <div class="form-group" :class="{ 'has-error': errors['teamData.country'] }">
              <label for="country">Kraj</label>
              <Field
                as="select"
                id="country"
                name="teamData.country"
              >
                <option value="" disabled>Wybierz kraj</option>
                <option value="poland">Polska</option>
                <option value="germany">Niemcy</option>
                <option value="czechRepublic">Czechy</option>
              </Field>
              <ErrorMessage name="teamData.country" class="error-message" />
            </div>

            <div class="form-group" :class="{ 'has-error': errors['teamData.invoice_email'] }">
              <label for="invoice_email">Adres do wysyłki faktur</label>
              <Field
                type="text"
                id="invoice_email"
                name="teamData.invoice_email"
                placeholder="E-mail adres"
              />
              <ErrorMessage name="teamData.invoice_email" class="error-message" />
            </div>
          </div>
        </div>

        <div class="button-container">
          <button type="submit" class="btn btn-primary">Zarejestruj się</button>
        </div>
      </Form>
    </div>
  </div>
</template>

<script setup>
import api from "@/api.js";
import { useRouter } from "vue-router";
import { useMainStore } from "@/stores/main.js";
import { useToast } from "vue-toastification";
import * as yup from 'yup';
import { Form, Field, ErrorMessage } from 'vee-validate';
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()
const router = useRouter();
const mainStore = useMainStore();
const toast = useToast();

// Definiowanie schematu walidacji YUP
const schema = yup.object({
  email: yup.string()
    .required('Email jest wymagany')
    .email('Niepoprawny format email'),
  password: yup.string()
    .required('Hasło jest wymagane')
    .min(8, 'Hasło musi mieć co najmniej 8 znaków'),
  repeatPassword: yup.string()
    .required('Powtórzenie hasła jest wymagane')
    .oneOf([yup.ref('password')], 'Hasła muszą być identyczne'),
  subscriptionPlanId: yup.string()
    .required('Wybierz subskrypcję'),
  teamData: yup.object({
    tax_id: yup.string()
      .required('NIP jest wymagany')
      .matches(/^\d{10}$/, 'NIP musi składać się z 10 cyfr'),
    companyName: yup.string()
      .required('Nazwa firmy jest wymagana'),
    street: yup.string()
      .required('Ulica jest wymagana'),
    postalCode: yup.string()
      .required('Kod pocztowy jest wymagany')
      .matches(/^\d{2}-\d{3}$/, 'Format kodu pocztowego: XX-XXX'),
    city: yup.string()
      .required('Miasto jest wymagane'),
    country: yup.string()
      .required('Kraj jest wymagany'),
    invoice_email: yup.string()
      .required('Email do faktur jest wymagany')
      .email('Niepoprawny format email')
  })
});

// Domyślne wartości formularza
const initialValues = {
  email: '',
  password: '',
  repeatPassword: '',
  subscriptionPlanId: 'c1b2dfe2-1f7c-4b90-97aa-12aab3b93a99',
  teamData: {
    tax_id: '',
    companyName: '',
    street: '',
    postalCode: '',
    city: '',
    country: '',
    invoice_email: ''
  }
};

// Obsługa formularza
const onSubmit = async (values) => {
  try {
    const response = await api.post('/profile/register', {
      email: values.email,
      password: values.password,
      teamData: values.teamData,
      subscriptionPlanId: values.subscriptionPlanId
    });

    await mainStore.setUser(response);
    api.setToken(response.data.token);

    toast.success("All good. We will redirect you to dashboard.", {
      position: "top-center",
      timeout: 5000,
      closeOnClick: true,
      pauseOnFocusLoss: true,
      pauseOnHover: true,
      draggable: true,
      draggablePercent: 0.6,
      showCloseButtonOnHover: false,
      hideProgressBar: true,
      closeButton: "button",
      icon: true,
      rtl: false
    });

    await router.push('/');
  } catch (error) {
    toast.error(error.response?.data?.message, {
      position: "top-center",
      timeout: 5000,
      closeOnClick: true,
      pauseOnFocusLoss: true,
      pauseOnHover: true,
      draggable: true,
      draggablePercent: 0.6,
      showCloseButtonOnHover: false,
      hideProgressBar: true,
      closeButton: "button",
      icon: true,
      rtl: false
    });
  }
};
</script>

