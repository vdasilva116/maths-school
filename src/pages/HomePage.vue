<template>
  <q-page class="home-page q-pa-lg">
    <section class="hero">
      <q-icon name="calculate" class="hero-icon" />

      <div class="badge">Maths School</div>

      <h1>Bienvenue dans ton espace de calcul</h1>

      <p>
        Entraîne-toi aux multiplications et aux divisions avec des cartes simples. Clique sur une
        carte pour afficher ou cacher le résultat.
      </p>

      <div class="actions">
        <q-btn
          label="Commencer les multiplications"
          icon="close"
          color="primary"
          unelevated
          rounded
          to="/multiplication"
        />

        <q-btn
          label="Commencer les divisions"
          icon="percent"
          color="secondary"
          unelevated
          rounded
          to="/division"
        />
      </div>
    </section>

    <div class="activity-grid">
      <q-card class="activity-card multiplication-card" clickable v-ripple to="/multiplication">
        <q-card-section>
          <div class="emoji">✖️</div>
          <div class="activity-title">Multiplications</div>
          <p>Entre une multiplication et vérifie rapidement si ton résultat est correct.</p>
        </q-card-section>
      </q-card>

      <q-card class="activity-card division-card" clickable v-ripple to="/division">
        <q-card-section>
          <div class="emoji">➗</div>
          <div class="activity-title">Divisions</div>
          <p>Entre une division et vérifie le quotient et le reste en un clic.</p>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script setup lang="ts"></script>

<style scoped>
.home-page {
  min-height: 100%;
  background: #f7f8fa;
}

.hero {
  padding: 48px 24px;
  margin-bottom: 24px;
  border-radius: 28px;
  text-align: center;
  background: linear-gradient(135deg, #e3f2fd, #f3e5f5);
}

.hero-icon {
  font-size: 4rem;
  color: #1976d2;
}

.badge {
  display: inline-block;
  margin: 16px 0;
  padding: 8px 16px;
  border-radius: 999px;
  background: white;
  color: #1976d2;
  font-weight: 700;
}

h1 {
  margin: 0;
  font-size: clamp(2rem, 5vw, 4rem);
  font-weight: 800;
  color: #1f2937;
}

.hero p {
  max-width: 680px;
  margin: 16px auto 0;
  font-size: 1.1rem;
  color: #5f6b7a;
}

.actions {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: 28px;
  flex-wrap: wrap;
}

.activity-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(220px, 1fr));
  gap: 18px;
}

.activity-card {
  border-radius: 24px;
  transition: 0.2s ease;
}

.activity-card:hover {
  transform: translateY(-4px);
}

.emoji {
  font-size: 3rem;
  margin-bottom: 12px;
}

.activity-title {
  font-size: 1.5rem;
  font-weight: 800;
  color: #1f2937;
}

.activity-card p {
  margin: 8px 0 0;
  color: #6b7280;
}

@media (max-width: 700px) {
  .home-page {
    padding: 16px;
  }

  .hero {
    padding: 32px 16px;
  }

  .activity-grid {
    grid-template-columns: 1fr;
  }
}
</style>
