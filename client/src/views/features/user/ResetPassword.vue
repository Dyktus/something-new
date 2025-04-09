<template>
  <div class="reset-password-container">
    <div class="reset-password-modal">
      <h1>Ustaw nowe hasło</h1>

      <!-- Formularz resetowania hasła -->
      <Form @submit="handleResetPassword" :validation-schema="schema" v-slot="{ errors }" v-if="!resetComplete">
        <p class="instruction-text">
          Wprowadź nowe hasło dla swojego konta. Hasło powinno być silne i bezpieczne.
        </p>

        <div class="form-group" :class="{ 'has-error': errors.password }">
          <label for="password">Nowe hasło</label>
          <Field
            type="password"
            id="password"
            name="password"
            placeholder="Wprowadź nowe hasło"
          />
          <ErrorMessage name="password" class="error-message" />
        </div>

        <div class="form-group" :class="{ 'has-error': errors.confirmPassword }">
          <label for="confirmPassword">Potwierdź hasło</label>
          <Field
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Powtórz nowe hasło"
          />
          <ErrorMessage name="confirmPassword" class="error-message" />
        </div>

        <div class="password-requirements">
          <h3>Wymagania dotyczące hasła:</h3>
          <ul>
            <li :class="{ 'fulfilled': passwordStrength.length }">Minimum 8 znaków</li>
            <li :class="{ 'fulfilled': passwordStrength.uppercase }">Przynajmniej jedna wielka litera</li>
            <li :class="{ 'fulfilled': passwordStrength.lowercase }">Przynajmniej jedna mała litera</li>
            <li :class="{ 'fulfilled': passwordStrength.number }">Przynajmniej jedna cyfra</li>
            <li :class="{ 'fulfilled': passwordStrength.special }">Przynajmniej jeden znak specjalny</li>
          </ul>
        </div>

        <div class="buttons">
          <button type="submit" class="btn btn-primary" :disabled="isSubmitting">
            {{ isSubmitting ? 'Przetwarzanie...' : 'Ustaw nowe hasło' }}
          </button>
          <router-link to="/login" class="btn btn-secondary">Powrót do logowania</router-link>
        </div>
      </Form>

      <!-- Potwierdzenie zmiany hasła -->
      <div v-if="resetComplete" class="confirmation-container">
        <div class="confirmation-icon">✅</div>
        <h2>Hasło zostało zmienione!</h2>
        <p class="confirmation-text">
          Twoje hasło zostało pomyślnie zresetowane. Możesz teraz zalogować się używając nowego hasła.
        </p>
        <div class="confirmation-actions">
          <router-link to="/login" class="btn btn-primary">Przejdź do logowania</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Form, Field, ErrorMessage } from 'vee-validate';
import { useToast } from 'vue-toastification';
import * as yup from 'yup';
import api from '@/api.js';

// Inicjalizacja
const toast = useToast();
const route = useRoute();
const router = useRouter();

// Stan komponentu
const isSubmitting = ref(false);
const resetComplete = ref(false);
const passwordInput = ref('');

// Pobieranie tokenu z query string
const resetToken = route.query.token;

// Sprawdzenie czy token istnieje
if (!resetToken) {
  toast.error("Brak wymaganego tokenu resetowania hasła.", {
    position: "top-center",
    timeout: 5000
  });
  // Przekieruj do strony odzyskiwania hasła
  router.push('/forgot-password');
}

// Schemat walidacji
const schema = yup.object({
  password: yup.string()
    .required('Hasło jest wymagane')
    .min(8, 'Hasło musi mieć co najmniej 8 znaków')
    .matches(/[A-Z]/, 'Hasło musi zawierać przynajmniej jedną wielką literę')
    .matches(/[a-z]/, 'Hasło musi zawierać przynajmniej jedną małą literę')
    .matches(/[0-9]/, 'Hasło musi zawierać przynajmniej jedną cyfrę')
    .matches(/[^A-Za-z0-9]/, 'Hasło musi zawierać przynajmniej jeden znak specjalny'),
  confirmPassword: yup.string()
    .required('Potwierdzenie hasła jest wymagane')
    .oneOf([yup.ref('password')], 'Hasła muszą być identyczne')
});

// Monitorowanie siły hasła
const passwordStrength = computed(() => {
  const password = passwordInput.value;
  return {
    length: password.length >= 8,
    lowercase: /[a-z]/.test(password),
    uppercase: /[A-Z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[^A-Za-z0-9]/.test(password)
  };
});

// Aktualizuj passwordInput gdy pole password się zmienia
watch(() => Field.target?.value, (value) => {
  if (Field.target?.name === 'password') {
    passwordInput.value = value || '';
  }
}, { deep: true });

// Obsługa resetowania hasła
const handleResetPassword = async (values) => {
  try {
    isSubmitting.value = true;

    // Symulacja opóźnienia API (usuń w rzeczywistej implementacji)
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Wywołanie API
    await api.post('/auth/reset-password', {
      token: resetToken,
      password: values.password
    });

    // Sukces - pokaż potwierdzenie
    resetComplete.value = true;

    toast.success("Twoje hasło zostało pomyślnie zmienione.", {
      position: "top-center",
      timeout: 5000
    });
  } catch (error) {
    // Obsługa błędów
    let errorMessage = "Wystąpił błąd podczas resetowania hasła. Spróbuj ponownie lub poproś o nowy link.";

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
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.reset-password-container {
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

.reset-password-modal {
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

.password-requirements {
  background-color: #f9f9f9;
  border-radius: 6px;
  padding: 15px;
  margin-bottom: 25px;
}

.password-requirements h3 {
  font-size: 14px;
  color: #555;
  margin-bottom: 10px;
  font-weight: 600;
}

.password-requirements ul {
  list-style-type: none;
  padding-left: 5px;
}

.password-requirements li {
  font-size: 13px;
  color: #777;
  margin-bottom: 5px;
  position: relative;
  padding-left: 20px;
}

.password-requirements li::before {
  content: "○";
  position: absolute;
  left: 0;
  color: #aaa;
}

.password-requirements li.fulfilled {
  color: #2e7d32;
}

.password-requirements li.fulfilled::before {
  content: "✓";
  color: #2e7d32;
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
  margin-bottom: 25px;
}

.confirmation-actions {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 10px;
}

@media (max-width: 480px) {
  .reset-password-modal {
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
