<style scoped>
.profile-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.profile-header {
  margin-bottom: 30px;
}

.profile-header h1 {
  font-size: 28px;
  color: #2e7d32;
  margin-bottom: 5px;
}

.profile-email {
  color: #666;
  font-size: 16px;
}

.profile-tabs {
  display: flex;
  border-bottom: 1px solid #e0e0e0;
  margin-bottom: 30px;
  overflow-x: auto;
}

.tab-button {
  display: flex;
  align-items: center;
  padding: 12px 20px;
  background: none;
  border: none;
  border-bottom: 3px solid transparent;
  cursor: pointer;
  color: #666;
  font-weight: 500;
  transition: all 0.3s ease;
  white-space: nowrap;
}

.tab-button:hover {
  color: #2e7d32;
  background-color: rgba(46, 125, 50, 0.05);
}

.tab-button.active {
  color: #2e7d32;
  border-bottom-color: #2e7d32;
}

.tab-icon {
  margin-right: 8px;
  font-size: 18px;
}

.profile-content {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.tab-content {
  padding: 5px;
}

.profile-section {
  padding: 25px;
  border-bottom: 1px solid #f0f0f0;
}

.profile-section:last-child {
  border-bottom: none;
}

.profile-section h2 {
  font-size: 20px;
  color: #333;
  margin-bottom: 20px;
  font-weight: 600;
}

.section-description {
  color: #666;
  margin-bottom: 20px;
  line-height: 1.5;
}

.form-group {
  margin-bottom: 20px;
}

.form-row {
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
}

.form-row .form-group {
  flex: 1;
  margin-bottom: 0;
}

.form-group.has-error input,
.form-group.has-error select {
  border-color: #f44336;
  background-color: rgba(244, 67, 54, 0.03);
}

label {
  display: block;
  color: #555;
  margin-bottom: 8px;
  font-weight: 500;
}

input, select, textarea {
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  transition: border-color 0.3s, box-shadow 0.3s;
}

textarea {
  min-height: 80px;
  resize: vertical;
}

input:focus, select:focus, textarea:focus {
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

.btn {
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-primary {
  background-color: #2e7d32;
  color: white;
}

.btn-primary:hover {
  background-color: #1b5e20;
}

.btn-secondary {
  background-color: #e0e0e0;
  color: #333;
}

.btn-secondary:hover {
  background-color: #d5d5d5;
}

.btn-danger {
  background-color: #d32f2f;
  color: white;
}

.btn-danger:hover {
  background-color: #b71c1c;
}

.btn-outline {
  background-color: transparent;
  color: #2e7d32;
  border: 1px solid #2e7d32;
}

.btn-outline:hover:not(:disabled) {
  background-color: rgba(46, 125, 50, 0.1);
}

.btn:disabled {
  background-color: #9e9e9e;
  cursor: not-allowed;
  opacity: 0.7;
}

/* Strefa niebezpieczna */
.danger-zone {
  background-color: rgba(211, 47, 47, 0.05);
  border-radius: 8px;
}

.warning-text {
  color: #d32f2f;
  margin-bottom: 20px;
  font-weight: 500;
}

/* Placeholder dla widgetu płatności */
.payment-widget-placeholder {
  background-color: #f9f9f9;
  border: 2px dashed #ddd;
  border-radius: 8px;
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;
}

.placeholder-icon {
  font-size: 48px;
  margin-bottom: 15px;
}

/* Subskrypcja */
.current-subscription {
  background-color: rgba(46, 125, 50, 0.05);
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
}

.subscription-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.subscription-name {
  font-size: 18px;
  font-weight: 600;
  color: #333;
}

.subscription-badge {
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
}

.status-active {
  background-color: rgba(46, 125, 50, 0.1);
  color: #2e7d32;
}

.status-canceled {
  background-color: rgba(211, 47, 47, 0.1);
  color: #d32f2f;
}

.status-past-due {
  background-color: rgba(255, 152, 0, 0.1);
  color: #ff9800;
}

.subscription-price {
  font-size: 24px;
  font-weight: 600;
  color: #2e7d32;
  margin-bottom: 15px;
}

.subscription-features {
  margin-bottom: 15px;
}

.subscription-features ul {
  list-style-type: none;
  padding-left: 5px;
}

.subscription-features li {
  padding: 6px 0;
  position: relative;
  padding-left: 20px;
}

.subscription-features li::before {
  content: "✓";
  position: absolute;
  left: 0;
  color: #2e7d32;
  font-weight: bold;
}

.subscription-period {
  font-size: 14px;
  color: #666;
}

.subscription-plans {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.subscription-plan {
  background-color: white;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 20px;
  transition: all 0.3s ease;
}

.plan-active {
  border-color: #2e7d32;
  box-shadow: 0 0 0 2px rgba(46, 125, 50, 0.2);
}

.plan-disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.plan-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.plan-name {
  font-size: 18px;
  font-weight: 600;
  color: #333;
}

.plan-current-tag {
  font-size: 12px;
  color: #2e7d32;
  background-color: rgba(46, 125, 50, 0.1);
  padding: 4px 8px;
  border-radius: 4px;
}

.plan-price {
  font-size: 24px;
  font-weight: 600;
  color: #2e7d32;
  margin-bottom: 15px;
}

.plan-features {
  margin-bottom: 20px;
}

.plan-features ul {
  list-style-type: none;
  padding-left: 5px;
}

.plan-features li {
  padding: 4px 0;
  position: relative;
  padding-left: 20px;
  font-size: 14px;
}

.plan-features li::before {
  content: "✓";
  position: absolute;
  left: 0;
  color: #2e7d32;
}

/* Lista zespołów */
.teams-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.team-item {
  display: flex;
  align-items: center;
  padding: 15px;
  border-radius: 8px;
  background-color: #f9f9f9;
  transition: all 0.3s ease;
}

.team-item.my-team {
  background-color: rgba(46, 125, 50, 0.1);
  cursor: pointer;
}

.team-item.my-team:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.team-icon {
  font-size: 24px;
  margin-right: 15px;
}

.team-details {
  flex: 1;
}

.team-name {
  font-weight: 600;
  color: #333;
  margin-bottom: 4px;
}

.team-role {
  font-size: 14px;
  color: #666;
}

.team-action {
  color: #2e7d32;
  font-size: 20px;
}

/* Faktury */
.invoices-filter {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-bottom: 20px;
  padding: 15px;
  background-color: #f9f9f9;
  border-radius: 8px;
}

.filter-group {
  display: flex;
  flex-direction: column;
  min-width: 150px;
}

.filter-group label {
  margin-bottom: 5px;
  font-size: 14px;
}

.table-responsive {
  overflow-x: auto;
}

.invoices-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

.invoices-table th,
.invoices-table td {
  padding: 12px 15px;
  text-align: left;
  border-bottom: 1px solid #eee;
}

.invoices-table th {
  background-color: #f9f9f9;
  font-weight: 600;
  color: #555;
}

.invoices-table tr:hover {
  background-color: #f5f5f5;
}

.status-badge {
  display: inline-block;
  padding: 3px 10px;
  border-radius: 50px;
  font-size: 12px;
  font-weight: 500;
}

.status-paid {
  background-color: rgba(46, 125, 50, 0.1);
  color: #2e7d32;
}

.status-pending {
  background-color: rgba(255, 152, 0, 0.1);
  color: #ff9800;
}

.status-overdue {
  background-color: rgba(211, 47, 47, 0.1);
  color: #d32f2f;
}

.btn-icon {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 18px;
  padding: 5px;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.btn-icon:hover {
  background-color: rgba(0, 0, 0, 0.1);
}

.icon {
  display: inline-block;
}

.empty-state {
  text-align: center;
  padding: 30px;
  color: #777;
  background-color: #f9f9f9;
  border-radius: 8px;
}

/* Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-container {
  background-color: white;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
}

.modal-header {
  padding: 20px;
  border-bottom: 1px solid #eee;
}

.modal-header h2 {
  margin: 0;
  color: #333;
}

.modal-header h2.danger {
  color: #d32f2f;
}

.modal-body {
  padding: 20px;
}

.modal-list {
  margin: 10px 0;
  padding-left: 25px;
}

.modal-list li {
  margin-bottom: 8px;
}

.confirmation-input {
  margin-top: 20px;
}

.confirmation-input label {
  display: block;
  margin-bottom: 10px;
  font-weight: 600;
  color: #d32f2f;
}

.cancel-reason {
  margin-top: 20px;
}

.cancel-reason label {
  margin-bottom: 10px;
  display: block;
}

.cancel-reason select {
  margin-bottom: 10px;
}

.modal-footer {
  padding: 20px;
  border-top: 1px solid #eee;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

/* Responsywność */
@media (max-width: 768px) {
  .profile-tabs {
    overflow-x: auto;
    padding-bottom: 5px;
  }

  .form-row {
    flex-direction: column;
    gap: 20px;
  }

  .profile-section {
    padding: 20px;
  }

  .subscription-plans {
    grid-template-columns: 1fr;
  }

  .invoices-filter {
    flex-direction: column;
  }

  .modal-container {
    width: 95%;
  }
}
</style>
<template>
  <LayoutAuthenticated>
    <div class="profile-container">
      <div class="profile-header">
        <h1>Twój profil</h1>
        <p class="profile-email">{{ user.email }}</p>
      </div>

      <div class="profile-tabs">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          class="tab-button"
          :class="{ 'active': activeTab === tab.id }"
          @click="activeTab = tab.id"
        >
          <span class="tab-icon">{{ tab.icon }}</span>
          <span class="tab-label">{{ tab.label }}</span>
        </button>
      </div>

      <div class="profile-content">
        <!-- Zakładka 1: Profil użytkownika -->
        <div v-if="activeTab === 'profile'" class="tab-content">
          <div class="profile-section">
            <h2>Dane konta</h2>
            <Form @submit="updatePassword" :validation-schema="passwordSchema" v-slot="{ errors }">
              <div class="form-group" :class="{ 'has-error': errors.currentPassword }">
                <label for="currentPassword">Aktualne hasło</label>
                <Field
                  type="password"
                  id="currentPassword"
                  name="currentPassword"
                  placeholder="Wprowadź aktualne hasło"
                />
                <ErrorMessage name="currentPassword" class="error-message"/>
              </div>

              <div class="form-group" :class="{ 'has-error': errors.newPassword }">
                <label for="newPassword">Nowe hasło</label>
                <Field
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  placeholder="Wprowadź nowe hasło"
                />
                <ErrorMessage name="newPassword" class="error-message"/>
              </div>

              <div class="form-group" :class="{ 'has-error': errors.confirmPassword }">
                <label for="confirmPassword">Potwierdź nowe hasło</label>
                <Field
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Powtórz nowe hasło"
                />
                <ErrorMessage name="confirmPassword" class="error-message"/>
              </div>

              <button type="submit" class="btn btn-primary">Aktualizuj hasło</button>
            </Form>
          </div>

          <div class="profile-section danger-zone">
            <h2>Strefa niebezpieczna</h2>
            <p class="warning-text">
              Usunięcie konta spowoduje trwałe usunięcie wszystkich Twoich danych i nie będzie można
              ich odzyskać.
            </p>
            <button @click="showDeleteConfirmation = true" class="btn btn-danger">Usuń konto
            </button>
          </div>
        </div>

        <!-- Zakładka 2: Dane firmy -->
        <div v-if="activeTab === 'company'" class="tab-content">
          <div class="profile-section">
            <h2>Dane firmy</h2>
            <p class="section-description">
              Zaktualizuj dane Twojej firmy, które są używane na fakturach i w dokumentach.
            </p>

            <Form @submit="updateCompanyData" :validation-schema="companySchema"
                  v-slot="{ errors }">
              <div class="form-group" :class="{ 'has-error': errors['teamData.companyName'] }">
                <label for="companyName">Nazwa firmy</label>
                <Field
                  type="text"
                  id="companyName"
                  name="teamData.companyName"
                  :placeholder="user.teamData.companyName || 'Nazwa firmy'"
                />
                <ErrorMessage name="teamData.companyName" class="error-message"/>
              </div>

              <div class="form-group" :class="{ 'has-error': errors['teamData.tax_id'] }">
                <label for="tax_id">NIP</label>
                <Field
                  type="text"
                  id="tax_id"
                  name="teamData.tax_id"
                  :placeholder="user.teamData.tax_id || 'Numer NIP'"
                />
                <ErrorMessage name="teamData.tax_id" class="error-message"/>
              </div>

              <div class="form-group" :class="{ 'has-error': errors['teamData.street'] }">
                <label for="street">Ulica</label>
                <Field
                  type="text"
                  id="street"
                  name="teamData.street"
                  :placeholder="user.teamData.street || 'Ulica i numer'"
                />
                <ErrorMessage name="teamData.street" class="error-message"/>
              </div>

              <div class="form-row">
                <div class="form-group" :class="{ 'has-error': errors['teamData.postalCode'] }">
                  <label for="postalCode">Kod pocztowy</label>
                  <Field
                    type="text"
                    id="postalCode"
                    name="teamData.postalCode"
                    :placeholder="user.teamData.postalCode || 'Kod pocztowy'"
                  />
                  <ErrorMessage name="teamData.postalCode" class="error-message"/>
                </div>

                <div class="form-group" :class="{ 'has-error': errors['teamData.city'] }">
                  <label for="city">Miasto</label>
                  <Field
                    type="text"
                    id="city"
                    name="teamData.city"
                    :placeholder="user.teamData.city || 'Miasto'"
                  />
                  <ErrorMessage name="teamData.city" class="error-message"/>
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
                <ErrorMessage name="teamData.country" class="error-message"/>
              </div>

              <div class="form-group" :class="{ 'has-error': errors['teamData.invoice_email'] }">
                <label for="invoice_email">Adres email do faktur</label>
                <Field
                  type="text"
                  id="invoice_email"
                  name="teamData.invoice_email"
                  :placeholder="user.teamData.invoice_email || 'Email do faktur'"
                />
                <ErrorMessage name="teamData.invoice_email" class="error-message"/>
              </div>

              <button type="submit" class="btn btn-primary">Aktualizuj dane firmy</button>
            </Form>
          </div>
        </div>

        <!-- Zakładka 3: Dane płatności i subskrypcje -->
        <div v-if="activeTab === 'payment'" class="tab-content">
          <div class="profile-section">
            <h2>Twój plan subskrypcji</h2>
            <div class="current-subscription">
              <div class="subscription-details">
                <div class="subscription-header">
                  <div class="subscription-name">{{ currentSubscription.name }}</div>
                  <div class="subscription-badge"
                       :class="getStatusClass(currentSubscription.status)">
                    {{ getStatusLabel(currentSubscription.status) }}
                  </div>
                </div>
                <div class="subscription-price">{{ currentSubscription.price }} / miesiąc</div>
                <div class="subscription-features">
                  <ul>
                    <li v-for="feature in currentSubscription.features" :key="feature">{{
                        feature
                      }}
                    </li>
                  </ul>
                </div>
                <div class="subscription-period">
                  Następne odnowienie: <strong>{{
                    formatDate(currentSubscription.nextBillingDate)
                  }}</strong>
                </div>
              </div>
            </div>
          </div>

          <div class="profile-section">
            <h2>Zmień plan</h2>
            <p class="section-description">
              Możesz w dowolnym momencie zmienić plan na inny. Zmiana wejdzie w życie od następnego
              okresu rozliczeniowego.
            </p>

            <div class="subscription-plans">
              <div
                v-for="plan in subscriptionPlans"
                :key="plan.id"
                class="subscription-plan"
                :class="{
                'plan-active': plan.id === currentSubscription.planId,
                'plan-disabled': plan.disabled
              }"
              >
                <div class="plan-header">
                  <div class="plan-name">{{ plan.name }}</div>
                  <div v-if="plan.id === currentSubscription.planId" class="plan-current-tag">
                    Aktualny plan
                  </div>
                </div>
                <div class="plan-price">{{ plan.price }} / miesiąc</div>
                <div class="plan-features">
                  <ul>
                    <li v-for="feature in plan.features" :key="feature">{{ feature }}</li>
                  </ul>
                </div>
                <button
                  class="btn btn-outline"
                  @click="changePlan(plan.id)"
                  :disabled="plan.id === currentSubscription.planId || plan.disabled"
                >
                  {{ plan.id === currentSubscription.planId ? 'Aktualny plan' : 'Wybierz plan' }}
                </button>
              </div>
            </div>
          </div>

          <div class="profile-section">
            <h2>Dane płatności</h2>
            <p class="section-description">
              Tutaj możesz dodać lub zaktualizować dane swojej karty płatniczej.
            </p>

            <div class="payment-widget-placeholder">
              <div class="placeholder-icon">💳</div>
              <p>Widget płatności zostanie dodany w tym miejscu.</p>
            </div>
          </div>

          <div class="profile-section danger-zone">
            <h2>Anulowanie subskrypcji</h2>
            <p class="warning-text">
              Anulowanie subskrypcji spowoduje utratę dostępu do wszystkich funkcji premium po
              zakończeniu bieżącego okresu rozliczeniowego.
            </p>
            <button @click="showCancelSubscriptionModal = true" class="btn btn-danger">Anuluj
              subskrypcję
            </button>
          </div>
        </div>

        <!-- Zakładka 4: Faktury -->
        <div v-if="activeTab === 'invoices'" class="tab-content">
          <div class="profile-section">
            <h2>Historia faktur</h2>
            <p class="section-description">
              Poniżej znajdziesz wszystkie faktury wystawione dla Twojego konta.
            </p>

            <div class="invoices-filter">
              <div class="filter-group">
                <label for="invoiceYear">Rok</label>
                <select id="invoiceYear" v-model="invoiceFilters.year">
                  <option v-for="year in availableYears" :key="year" :value="year">{{
                      year
                    }}
                  </option>
                </select>
              </div>

              <div class="filter-group">
                <label for="invoiceStatus">Status</label>
                <select id="invoiceStatus" v-model="invoiceFilters.status">
                  <option value="all">Wszystkie</option>
                  <option value="paid">Opłacone</option>
                  <option value="pending">Oczekujące</option>
                  <option value="overdue">Zaległe</option>
                </select>
              </div>

              <button class="btn btn-secondary" @click="resetInvoiceFilters">
                Resetuj filtry
              </button>
            </div>

            <div class="table-responsive">
              <table class="invoices-table">
                <thead>
                <tr>
                  <th>Numer faktury</th>
                  <th>Data wystawienia</th>
                  <th>Kwota</th>
                  <th>Status</th>
                  <th>Akcje</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="invoice in filteredInvoices" :key="invoice.id">
                  <td>{{ invoice.number }}</td>
                  <td>{{ formatDate(invoice.issuedAt) }}</td>
                  <td>{{ invoice.amount }}</td>
                  <td>
                    <span class="status-badge" :class="getInvoiceStatusClass(invoice.status)">
                      {{ getInvoiceStatusLabel(invoice.status) }}
                    </span>
                  </td>
                  <td>
                    <button class="btn-icon" @click="downloadInvoice(invoice.id)"
                            title="Pobierz fakturę">
                      <span class="icon">📥</span>
                    </button>
                  </td>
                </tr>
                </tbody>
              </table>
            </div>

            <div v-if="filteredInvoices.length === 0" class="empty-state">
              <p>Brak faktur spełniających wybrane kryteria.</p>
            </div>
          </div>
        </div>

        <!-- Zakładka 5: Zespoły -->
        <div v-if="activeTab === 'teams'" class="tab-content">
          <div class="profile-section">
            <h2>Twoje zespoły</h2>
            <p class="section-description">
              Lista zespołów, w których jesteś członkiem.
            </p>

            <div class="teams-list">
              <div
                v-for="team in teams"
                :key="team.id"
                class="team-item"
                :class="{ 'my-team': team.isOwner }"
                @click="team.isOwner ? navigateToTeam(team.id) : null"
              >
                <div class="team-icon">{{ team.isOwner ? '👑' : '👥' }}</div>
                <div class="team-details">
                  <div class="team-name">{{ team.name }}</div>
                  <div class="team-role">{{ team.isOwner ? 'Właściciel' : 'Członek' }}</div>
                </div>
                <div v-if="team.isOwner" class="team-action">
                  <span class="action-icon">→</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal potwierdzenia usunięcia konta -->
    <div class="modal-overlay" v-if="showDeleteConfirmation">
      <div class="modal-container">
        <div class="modal-header">
          <h2>Potwierdź usunięcie konta</h2>
        </div>
        <div class="modal-body">
          <p>
            Czy na pewno chcesz usunąć swoje konto? Ta operacja jest <strong>nieodwracalna</strong>
            i spowoduje
            utratę wszystkich Twoich danych, w tym zespołów, projektów i ustawień.
          </p>
          <div class="confirmation-input">
            <label for="confirmDelete">Aby potwierdzić, wpisz "USUŃ KONTO"</label>
            <input
              type="text"
              id="confirmDelete"
              v-model="deleteConfirmText"
              placeholder="USUŃ KONTO"
            />
          </div>
        </div>
        <div class="modal-footer">
          <button @click="showDeleteConfirmation = false" class="btn btn-secondary">Anuluj</button>
          <button
            @click="deleteAccount"
            class="btn btn-danger"
            :disabled="deleteConfirmText !== 'USUŃ KONTO'"
          >
            Potwierdzam usunięcie konta
          </button>
        </div>
      </div>
    </div>

    <!-- Modal anulowania subskrypcji -->
    <div class="modal-overlay" v-if="showCancelSubscriptionModal">
      <div class="modal-container">
        <div class="modal-header">
          <h2>Anulowanie subskrypcji</h2>
        </div>
        <div class="modal-body">
          <p>
            Czy na pewno chcesz anulować swoją subskrypcję? Po anulowaniu:
          </p>
          <ul class="modal-list">
            <li>Twoja subskrypcja będzie aktywna do końca bieżącego okresu rozliczeniowego
              ({{ formatDate(currentSubscription.nextBillingDate) }})
            </li>
            <li>Po tym terminie Twoje konto zostanie przekonwertowane na darmowy plan z
              ograniczonymi funkcjami
            </li>
            <li>Nie będziesz już obciążany opłatami za subskrypcję</li>
            <li>Możesz ponownie aktywować subskrypcję w dowolnym momencie</li>
          </ul>
          <div class="cancel-reason">
            <label for="cancelReason">Powód anulowania (opcjonalnie)</label>
            <select id="cancelReason" v-model="cancelReason">
              <option value="">Wybierz powód...</option>
              <option value="too_expensive">Za drogo</option>
              <option value="missing_features">Brak potrzebnych funkcji</option>
              <option value="not_using">Nie korzystam wystarczająco często</option>
              <option value="switching">Przechodzę na inną usługę</option>
              <option value="other">Inny powód</option>
            </select>
            <textarea
              v-if="cancelReason === 'other'"
              v-model="cancelReasonOther"
              placeholder="Proszę podać powód..."
              rows="3"
            ></textarea>
          </div>
        </div>
        <div class="modal-footer">
          <button @click="showCancelSubscriptionModal = false" class="btn btn-secondary">Zachowaj
            subskrypcję
          </button>
          <button
            @click="cancelSubscription"
            class="btn btn-danger"
          >
            Anuluj subskrypcję
          </button>
        </div>
      </div>
    </div>
  </LayoutAuthenticated>
</template>

<script setup>
import {ref, reactive, computed} from 'vue';
import {useRouter} from 'vue-router';
import {Form, Field, ErrorMessage} from 'vee-validate';
import {useToast} from 'vue-toastification';
import * as yup from 'yup';
import api from '@/api.js';
import {useMainStore} from '@/stores/main';
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";

const router = useRouter();
const toast = useToast();
const mainStore = useMainStore();

// Aktualna zakładka
const activeTab = ref('profile');

// Definicja zakładek
const tabs = [
  {id: 'profile', label: 'Dane konta', icon: '👤'},
  {id: 'company', label: 'Dane firmy', icon: '🏢'},
  {id: 'payment', label: 'Subskrypcja', icon: '💳'},
  {id: 'invoices', label: 'Faktury', icon: '📄'},
  {id: 'teams', label: 'Zespoły', icon: '👥'}
];

// Stany modali
const showDeleteConfirmation = ref(false);
const deleteConfirmText = ref('');
const showCancelSubscriptionModal = ref(false);
const cancelReason = ref('');
const cancelReasonOther = ref('');

// Przykładowe dane użytkownika (w rzeczywistym projekcie pobierane z API/store)
const user = reactive({
  id: '1',
  email: 'jan.kowalski@example.com',
  teamData: {
    companyName: 'Firma Example Sp. z o.o.',
    tax_id: '1234567890',
    street: 'ul. Przykładowa 123',
    postalCode: '00-001',
    city: 'Warszawa',
    country: 'poland',
    invoice_email: 'faktury@example.com'
  }
});

// Przykładowe dane subskrypcji
const currentSubscription = reactive({
  planId: 'plan2',
  name: 'Plan Business',
  price: '99 zł',
  status: 'active',
  nextBillingDate: '2025-05-09T00:00:00Z',
  features: [
    'Nieograniczona liczba projektów',
    'Do 10 użytkowników',
    'Priorytetowe wsparcie',
    'Raporty zaawansowane'
  ]
});

// Dostępne plany subskrypcji
const subscriptionPlans = reactive([
  {
    id: 'plan1',
    name: 'Plan Basic',
    price: '49 zł',
    disabled: false,
    features: [
      'Do 3 projektów',
      'Do 3 użytkowników',
      'Podstawowe wsparcie',
      'Raporty podstawowe'
    ]
  },
  {
    id: 'plan2',
    name: 'Plan Business',
    price: '99 zł',
    disabled: false,
    features: [
      'Nieograniczona liczba projektów',
      'Do 10 użytkowników',
      'Priorytetowe wsparcie',
      'Raporty zaawansowane'
    ]
  },
  {
    id: 'plan3',
    name: 'Plan Enterprise',
    price: '299 zł',
    disabled: false,
    features: [
      'Nieograniczona liczba projektów',
      'Nieograniczona liczba użytkowników',
      'Wsparcie 24/7',
      'Raporty niestandardowe',
      'Dedykowany opiekun klienta'
    ]
  }
]);

// Przykładowe dane zespołów
const teams = ref([
  {id: '1', name: 'Mój zespół', isOwner: true},
  {id: '2', name: 'Zespół Marketingu', isOwner: false},
  {id: '3', name: 'Zespół Projektowy XYZ', isOwner: false}
]);

// Przykładowe dane faktur
const invoices = ref([
  {
    id: '1',
    number: 'FV/2025/04/001',
    issuedAt: '2025-04-01T12:00:00Z',
    amount: '99 zł',
    status: 'paid'
  },
  {
    id: '2',
    number: 'FV/2025/03/001',
    issuedAt: '2025-03-01T12:00:00Z',
    amount: '99 zł',
    status: 'paid'
  },
  {
    id: '3',
    number: 'FV/2025/02/001',
    issuedAt: '2025-02-01T12:00:00Z',
    amount: '99 zł',
    status: 'paid'
  },
  {
    id: '4',
    number: 'FV/2025/01/001',
    issuedAt: '2025-01-01T12:00:00Z',
    amount: '99 zł',
    status: 'paid'
  },
  {
    id: '5',
    number: 'FV/2024/12/001',
    issuedAt: '2024-12-01T12:00:00Z',
    amount: '99 zł',
    status: 'paid'
  },
  {
    id: '6',
    number: 'FV/2024/11/001',
    issuedAt: '2024-11-01T12:00:00Z',
    amount: '49 zł',
    status: 'paid'
  },
]);

// Filtry dla faktur
const invoiceFilters = reactive({
  year: '2025',
  status: 'all'
});

// Dostępne lata do filtrowania (dynamicznie na podstawie faktur)
const availableYears = computed(() => {
  const years = new Set();
  invoices.value.forEach(invoice => {
    const year = new Date(invoice.issuedAt).getFullYear().toString();
    years.add(year);
  });
  return [...years].sort((a, b) => b - a); // sortowanie malejąco
});

// Filtrowane faktury
const filteredInvoices = computed(() => {
  return invoices.value.filter(invoice => {
    const invoiceYear = new Date(invoice.issuedAt).getFullYear().toString();
    const yearMatch = invoiceYear === invoiceFilters.year;
    const statusMatch = invoiceFilters.status === 'all' || invoice.status === invoiceFilters.status;
    return yearMatch && statusMatch;
  });
});

// Schematy walidacji
const passwordSchema = yup.object({
  currentPassword: yup.string().required('Aktualne hasło jest wymagane'),
  newPassword: yup.string()
    .required('Nowe hasło jest wymagane')
    .min(8, 'Hasło musi mieć co najmniej 8 znaków'),
  confirmPassword: yup.string()
    .required('Potwierdzenie hasła jest wymagane')
    .oneOf([yup.ref('newPassword')], 'Hasła muszą być identyczne')
});

const companySchema = yup.object({
  teamData: yup.object({
    companyName: yup.string().required('Nazwa firmy jest wymagana'),
    tax_id: yup.string()
      .required('NIP jest wymagany')
      .matches(/^\d{10}$/, 'NIP musi składać się z 10 cyfr'),
    street: yup.string().required('Ulica jest wymagana'),
    postalCode: yup.string()
      .required('Kod pocztowy jest wymagany')
      .matches(/^\d{2}-\d{3}$/, 'Format kodu pocztowego: XX-XXX'),
    city: yup.string().required('Miasto jest wymagane'),
    country: yup.string().required('Kraj jest wymagany'),
    invoice_email: yup.string()
      .required('Email do faktur jest wymagany')
      .email('Niepoprawny format email')
  })
});

// Formatowanie daty
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('pl-PL', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });
};

// Resetowanie filtrów faktur
const resetInvoiceFilters = () => {
  invoiceFilters.year = '2025';
  invoiceFilters.status = 'all';
};

// Status subskrypcji
const getStatusClass = (status) => {
  switch (status) {
    case 'active':
      return 'status-active';
    case 'canceled':
      return 'status-canceled';
    case 'past_due':
      return 'status-past-due';
    default:
      return '';
  }
};

const getStatusLabel = (status) => {
  switch (status) {
    case 'active':
      return 'Aktywna';
    case 'canceled':
      return 'Anulowana';
    case 'past_due':
      return 'Zaległa płatność';
    default:
      return status;
  }
};

// Status faktury
const getInvoiceStatusClass = (status) => {
  switch (status) {
    case 'paid':
      return 'status-paid';
    case 'pending':
      return 'status-pending';
    case 'overdue':
      return 'status-overdue';
    default:
      return '';
  }
};

const getInvoiceStatusLabel = (status) => {
  switch (status) {
    case 'paid':
      return 'Opłacona';
    case 'pending':
      return 'Oczekująca';
    case 'overdue':
      return 'Zaległa';
    default:
      return status;
  }
};

// Aktualizacja hasła
const updatePassword = async (values) => {
  try {
    await api.post('/profile/update-password', {
      currentPassword: values.currentPassword,
      newPassword: values.newPassword
    });

    toast.success('Hasło zostało pomyślnie zaktualizowane', {
      position: 'top-center',
      timeout: 3000
    });
  } catch (error) {
    toast.error('Nie udało się zaktualizować hasła. Sprawdź, czy aktualne hasło jest poprawne.', {
      position: 'top-center',
      timeout: 5000
    });
  }
};

// Aktualizacja danych firmy
const updateCompanyData = async (values) => {
  try {
    await api.post('/profile/update-company', {
      teamData: values.teamData
    });

    // Aktualizuj lokalne dane
    Object.assign(user.teamData, values.teamData);

    toast.success('Dane firmy zostały zaktualizowane', {
      position: 'top-center',
      timeout: 3000
    });
  } catch (error) {
    toast.error('Nie udało się zaktualizować danych firmy', {
      position: 'top-center',
      timeout: 5000
    });
  }
};

// Zmiana planu subskrypcji
const changePlan = async (planId) => {
  try {
    await api.post('/subscription/change-plan', {planId});

    const selectedPlan = subscriptionPlans.find(plan => plan.id === planId);

    // Aktualizuj dane subskrypcji lokalnie
    currentSubscription.planId = planId;
    currentSubscription.name = selectedPlan.name;
    currentSubscription.price = selectedPlan.price;
    currentSubscription.features = [...selectedPlan.features];

    toast.success(`Twój plan został zmieniony na ${selectedPlan.name}. Zmiana wejdzie w życie od następnego okresu rozliczeniowego.`, {
      position: 'top-center',
      timeout: 5000
    });
  } catch (error) {
    toast.error('Nie udało się zmienić planu subskrypcji. Spróbuj ponownie później.', {
      position: 'top-center',
      timeout: 5000
    });
  }
};

// Anulowanie subskrypcji
const cancelSubscription = async () => {
  try {
    const payload = {
      reason: cancelReason,
      reasonDetails: cancelReason === 'other' ? cancelReasonOther : null
    };

    await api.post('/subscription/cancel', payload);

    // Aktualizuj dane subskrypcji lokalnie
    currentSubscription.status = 'canceled';

    // Zamknij modal
    showCancelSubscriptionModal.value = false;
    cancelReason.value = '';
    cancelReasonOther.value = '';

    toast.info('Twoja subskrypcja została anulowana. Będzie aktywna do końca bieżącego okresu rozliczeniowego.', {
      position: 'top-center',
      timeout: 5000
    });
  } catch (error) {
    toast.error('Nie udało się anulować subskrypcji. Spróbuj ponownie później.', {
      position: 'top-center',
      timeout: 5000
    });
  }
};

// Usunięcie konta
const deleteAccount = async () => {
  try {
    await api.post('/profile/delete-account');

    // Wylogowanie użytkownika
    await mainStore.clearUser();

    toast.info('Twoje konto zostało usunięte', {
      position: 'top-center',
      timeout: 5000
    });

    // Przekierowanie do strony logowania
    router.push('/login');
  } catch (error) {
    toast.error('Nie udało się usunąć konta', {
      position: 'top-center',
      timeout: 5000
    });
  } finally {
    showDeleteConfirmation.value = false;
    deleteConfirmText.value = '';
  }
};

// Pobieranie faktury
const downloadInvoice = async (invoiceId) => {
  try {
    const response = await api.get(`/invoices/${invoiceId}/download`, {responseType: 'blob'});

    // Tworzenie linku do pobierania
    const blob = new Blob([response.data], {type: 'application/pdf'});
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = `faktura-${invoiceId}.pdf`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);

    toast.success('Faktura została pobrana', {
      position: 'top-center',
      timeout: 3000
    });
  } catch (error) {
    toast.error('Nie udało się pobrać faktury', {
      position: 'top-center',
      timeout: 5000
    });
  }
};

// Nawigacja do szczegółów zespołu
const navigateToTeam = (teamId) => {
  router.push(`/dashboard/teams/${teamId}`);
};
</script>
