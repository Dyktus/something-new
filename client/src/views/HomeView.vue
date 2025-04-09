<script setup>
import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue'
</script>

<template>
  <LayoutAuthenticated>
    <div class="dashboard-home">
      <div class="stats-container">
        <div class="stat-card">
          <div class="stat-icon">👥</div>
          <div class="stat-content">
            <div class="stat-value">2,534</div>
            <div class="stat-label">Użytkownicy</div>
          </div>
          <div class="stat-change positive">
            <span class="arrow">↑</span>
            <span class="percentage">12%</span>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon">📊</div>
          <div class="stat-content">
            <div class="stat-value">7,842</div>
            <div class="stat-label">Transakcje</div>
          </div>
          <div class="stat-change positive">
            <span class="arrow">↑</span>
            <span class="percentage">8%</span>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon">💰</div>
          <div class="stat-content">
            <div class="stat-value">32,485 zł</div>
            <div class="stat-label">Przychód</div>
          </div>
          <div class="stat-change positive">
            <span class="arrow">↑</span>
            <span class="percentage">15%</span>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon">📦</div>
          <div class="stat-content">
            <div class="stat-value">245</div>
            <div class="stat-label">Nowe produkty</div>
          </div>
          <div class="stat-change negative">
            <span class="arrow">↓</span>
            <span class="percentage">3%</span>
          </div>
        </div>
      </div>

      <div class="dashboard-panels">
        <div class="panel recent-activities">
          <div class="panel-header">
            <h2>Ostatnie aktywności</h2>
            <button class="view-all-button">Zobacz wszystkie</button>
          </div>

          <div class="activities-list">
            <div class="activity-item">
              <div class="activity-icon">📝</div>
              <div class="activity-content">
                <div class="activity-title">Nowa rejestracja użytkownika</div>
                <div class="activity-detail">Jan Kowalski zarejestrował się w systemie</div>
                <div class="activity-time">2 godziny temu</div>
              </div>
            </div>

            <div class="activity-item">
              <div class="activity-icon">💰</div>
              <div class="activity-content">
                <div class="activity-title">Nowa transakcja</div>
                <div class="activity-detail">Transakcja #1234 została zrealizowana</div>
                <div class="activity-time">4 godziny temu</div>
              </div>
            </div>

            <div class="activity-item">
              <div class="activity-icon">⚙️</div>
              <div class="activity-content">
                <div class="activity-title">Zmiana ustawień systemu</div>
                <div class="activity-detail">Administrator zmienił ustawienia płatności</div>
                <div class="activity-time">wczoraj</div>
              </div>
            </div>

            <div class="activity-item">
              <div class="activity-icon">📊</div>
              <div class="activity-content">
                <div class="activity-title">Raport wygenerowany</div>
                <div class="activity-detail">Miesięczny raport sprzedaży został wygenerowany</div>
                <div class="activity-time">2 dni temu</div>
              </div>
            </div>
          </div>
        </div>

        <div class="panel quick-actions">
          <div class="panel-header">
            <h2>Szybkie akcje</h2>
          </div>

          <div class="actions-grid">
            <button class="action-button">
              <div class="action-icon">👥</div>
              <div class="action-label">Dodaj użytkownika</div>
            </button>

            <button class="action-button">
              <div class="action-icon">📊</div>
              <div class="action-label">Generuj raport</div>
            </button>

            <button class="action-button">
              <div class="action-icon">📝</div>
              <div class="action-label">Nowa wiadomość</div>
            </button>

            <button class="action-button">
              <div class="action-icon">⚙️</div>
              <div class="action-label">Ustawienia</div>
            </button>

            <button class="action-button">
              <div class="action-icon">📦</div>
              <div class="action-label">Dodaj produkt</div>
            </button>

            <button class="action-button">
              <div class="action-icon">💰</div>
              <div class="action-label">Nowa transakcja</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  </LayoutAuthenticated>
</template>
