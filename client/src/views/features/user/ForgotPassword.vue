<template>
  <div class="forgot-password-container">
    <div class="forgot-password-modal">
      <h1>Odzyskiwanie hasła</h1>

      <!-- Formularz przed wysłaniem -->
      <Form @submit="handleForgotPassword" :validation-schema="schema" v-slot="{ errors }" v-if="!emailSent">
        <p class="instruction-text">
          Wpisz adres e-mail powiązany z Twoim kontem, a my wyślemy Ci link do zresetowania hasła.
        </p>

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

        <div class="buttons">
          <button type="submit" class="btn btn-primary" :disabled="isSubmitting">
            {{ isSubmitting ? 'Wysyłanie...' : 'Wyślij link resetujący' }}
          </button>
          <router-link to="/login" class="btn btn-secondary">Powrót do logowania</router-link>
        </div>
      </Form>

      <!-- Potwierdzenie wysłania -->
      <div v-if="emailSent" class="confirmation-container">
        <div class="confirmation-icon">✅</div>
        <h2>Link został wysłany!</h2>
        <p class="confirmation-text">
          Na adres <strong>{{ emailAddress }}</strong> wysłaliśmy link umożliwiający
          zresetowanie hasła. Sprawdź swoją skrzynkę odbiorczą i postępuj zgodnie
          z instrukcjami w wiadomości.
        </p>
        <p class="confirmation-note">
          Jeśli nie widzisz wiadomości, sprawdź folder spam.
        </p>
        <div class="confirmation-actions">
          <router-link to="/login" class="btn btn-primary">Powrót do logowania</router-link>
          <button @click="resendEmail" class="btn btn-link">Wyślij link ponownie</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { Form, Field, ErrorMessage } from 'vee-validate';
import { useToast } from 'vue-toastification';
import * as yup from 'yup';
import api from '@/api.js';

// Inicjalizacja toastu
const toast = useToast();

// Stan komponentu
const isSubmitting = ref(false);
const emailSent = ref(false);
const emailAddress = ref('');

// Schemat walidacji
const schema = yup.object({
  email: yup.string()
    .required('Email jest wymagany')
    .email('Niepoprawny format email')
});

// Obsługa wysyłania formularza
const handleForgotPassword = async (values) => {
  try {
    isSubmitting.value = true;

    // Symulacja opóźnienia API (usuń w rzeczywistej implementacji)
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Wywołanie API
    await api.post('/auth/forgot-password', {
      email: values.email
    });

    // Sukces - zapisz email i pokaż potwierdzenie
    emailAddress.value = values.email;
    emailSent.value = true;

    toast.success("Link do resetowania hasła został wysłany na Twój adres email.", {
      position: "top-center",
      timeout: 5000
    });
  } catch (error) {
    // Obsługa błędów
    let errorMessage = "Wystąpił błąd podczas wysyłania linku resetującego. Spróbuj ponownie.";

    if (error.response && error.response.data && error.response.data.message) {
      errorMessage = error.response.data.message;
    }

    toast.error(errorMessage, {
      position: "top-center",
      timeout: 5000
    });

    console.error('Błąd podczas resetowania hasła:', error);
  } finally {
    isSubmitting.value = false;
  }
};

// Ponowne wysłanie emaila
const resendEmail = async () => {
  try {
    // Symulacja opóźnienia API (usuń w rzeczywistej implementacji)
    await new Promise(resolve => setTimeout(resolve, 800));

    // Wywołanie API
    await api.post('/auth/forgot-password', {
      email: emailAddress.value
    });

    toast.info("Link do resetowania hasła został ponownie wysłany.", {
      position: "top-center",
      timeout: 5000
    });
  } catch (error) {
    toast.error("Nie udało się ponownie wysłać linku. Spróbuj później.", {
      position: "top-center",
      timeout: 5000
    });
  }
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.forgot-password-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #66bb6a, #81c784, #a5d6a7) no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  min-height: 100vh;
  padding: 20px;
}

.forgot-password-modal {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  width: 90%;
  max-width: 450px;
  padding: 30px;
  animation: fadeIn 0.5s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

h1 {
  color: #2e7d32;
  text-align: center;
  margin-bottom: 25px;
  font-size: 28px;
}

.instruction-text {
  margin-bottom: 25px;
  color: #555;
  text-align: center;
  font-size: 16px;
  line-height: 1.5;
}

.form-group {
  margin-bottom: 20px;
  position: relative;
}

.form-group.has-error input {
  border-color: #f44336;
  background-color: rgba(244, 67, 54, 0.03);
}

.form-group.has-error input:focus {
  box-shadow: 0 0 0 2px rgba(244, 67, 54, 0.2) !important;
}

label {
  display: block;
  color: #555;
  margin-bottom: 8px;
  font-weight: 500;
}

input {
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  transition: border-color 0.3s, box-shadow 0.3s;
}

input:focus {
  border-color: #2e7d32;
  outline: none;
  box-shadow: 0 0 0 2px rgba(46, 125, 50, 0.2);
}

.error-message {
  color: #f44336;
  font-size: 12px;
  margin-top: 5px;
  display: block;
  font-weight: 500;
}

.buttons {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 30px;
}

.btn {
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
  text-align: center;
  text-decoration: none;
}

.btn:hover {
  transform: translateY(-2px);
}

.btn:active {
  transform: translateY(0);
}

.btn:disabled {
  background-color: #9e9e9e;
  cursor: not-allowed;
  transform: none;
}

.btn-primary {
  background-color: #2e7d32;
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background-color: #1b5e20;
}

.btn-secondary {
  background-color: #e0e0e0;
  color: #333;
}

.btn-secondary:hover {
  background-color: #d5d5d5;
}

.btn-link {
  background: none;
  color: #2e7d32;
  text-decoration: underline;
  padding: 8px;
  font-size: 14px;
}

.btn-link:hover {
  background-color: rgba(46, 125, 50, 0.05);
  transform: none;
}

/* Styl dla widoku potwierdzenia */
.confirmation-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.confirmation-icon {
  font-size: 48px;
  margin-bottom: 20px;
}

h2 {
  color: #2e7d32;
  margin-bottom: 15px;
  font-size: 22px;
}

.confirmation-text {
  color: #555;
  line-height: 1.6;
  margin-bottom: 15px;
}

.confirmation-note {
  color: #777;
  font-size: 14px;
  margin-bottom: 25px;
  font-style: italic;
}

.confirmation-actions {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 10px;
}

@media (max-width: 480px) {
  .forgot-password-modal {
    padding: 20px;
  }

  h1 {
    font-size: 24px;
  }

  .btn {
    padding: 10px 15px;
  }
}
</style>
