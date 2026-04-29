<template>
  <q-page class="math-page q-pa-lg">
    <div class="top-actions">
      <q-btn label="Accueil" icon="home" color="primary" rounded to="/" />
    </div>

    <div class="page-header">
      <q-icon name="percent" class="icon" />
      <h1>Divisions</h1>
      <p>Ajoute une division puis clique sur la carte pour voir le résultat.</p>
    </div>

    <q-card class="form-card q-mb-lg">
      <q-card-section class="row q-col-gutter-md items-end">
        <q-input
          v-model.number="a"
          label="Dividende"
          type="number"
          outlined
          dense
          class="col-12 col-md-4"
          @keyup.enter="addCalculation"
        />

        <q-input
          v-model.number="b"
          label="Diviseur"
          type="number"
          outlined
          dense
          class="col-12 col-md-4"
          @keyup.enter="addCalculation"
        />

        <q-btn
          icon="add"
          label="Ajouter"
          class="add-btn"
          :disable="a === null || b === null"
          @click="addCalculation"
        />
      </q-card-section>
    </q-card>

    <q-banner v-if="calculations.length === 0" rounded class="bg-grey-2 text-grey-8">
      Aucun calcul pour le moment.
    </q-banner>

    <div class="cards-grid">
      <q-card
        v-for="calc in calculations"
        :key="calc.id"
        class="calc-card"
        @click="toggle(calc.id)"
      >
        <q-card-section class="card-content">
          <div class="calc-line">
            <span class="calculation">{{ calc.a }} ÷ {{ calc.b }}</span>

            <span class="result">
              <template v-if="calc.visible">
                = {{ calc.quotient }} reste {{ calc.remainder }}
              </template>
              <template v-else> = ? </template>
            </span>
          </div>

          <q-btn
            icon="delete"
            color="negative"
            flat
            round
            dense
            @click.stop="confirmDeleteCalculation(calc.id)"
          />
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';

interface Calculation {
  id: number;
  a: number;
  b: number;
  quotient: number;
  remainder: number;
  visible: boolean;
}

const a = ref<number | null>(null);
const b = ref<number | null>(null);
const calculations = ref<Calculation[]>([]);

function addCalculation() {
  const valA = Number(a.value);
  const valB = Number(b.value);

  // ❌ validation
  if (!Number.isFinite(valA) || !Number.isFinite(valB)) return;
  if (valB === 0) {
    alert('Impossible de diviser par 0');
    return;
  }

  calculations.value.unshift({
    id: Date.now(),
    a: valA,
    b: valB,
    quotient: Math.floor(valA / valB),
    remainder: valA % valB,
    visible: false,
  });

  a.value = null;
  b.value = null;
}

function toggle(id: number) {
  const calc = calculations.value.find((c) => c.id === id);
  if (calc) calc.visible = !calc.visible;
}

function confirmDeleteCalculation(id: number) {
  const confirmed = window.confirm('Voulez-vous vraiment supprimer cette carte ?');
  if (confirmed) deleteCalculation(id);
}

function deleteCalculation(id: number) {
  calculations.value = calculations.value.filter((calc) => calc.id !== id);
}

// 💾 LOAD
onMounted(() => {
  const saved = localStorage.getItem('divisions');
  if (saved) {
    calculations.value = JSON.parse(saved);
  }
});

// 💾 SAVE
watch(
  calculations,
  (newValue) => {
    localStorage.setItem('divisions', JSON.stringify(newValue));
  },
  { deep: true },
);
</script>

<style scoped>
.math-page {
  min-height: 100%;
  background: #f7f8fa;
}

.top-actions {
  margin-bottom: 12px;
}

.page-header {
  text-align: center;
  margin-bottom: 24px;
}

.add-btn {
  border-radius: 14px;
  padding: 8px 18px;
  font-weight: 700;
  text-transform: none;
  background: #26a69a;
  color: white;
  margin-left: 15px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
  transition: 0.2s;
}

.add-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.18);
}

.icon {
  font-size: 3rem;
  color: #26a69a;
}

h1 {
  margin: 8px 0 0;
  font-size: 2rem;
  font-weight: 800;
}

.page-header p {
  margin-top: 8px;
  color: #6b7280;
}

.form-card {
  border-radius: 18px;
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 16px;
}

.calc-card {
  border-radius: 20px;
  cursor: pointer;
  transition: 0.2s;
}

.calc-card:hover {
  transform: translateY(-4px);
}

.card-content {
  min-height: 90px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.calc-line {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.calculation {
  font-size: 1.8rem;
  font-weight: 800;
}

.result {
  min-width: 70px;
  font-size: 1.4rem;
  font-weight: 800;
  color: #26a69a;
}

@media (max-width: 600px) {
  .math-page {
    padding: 16px;
  }

  .calculation,
  .result {
    font-size: 1.5rem;
  }
}
</style>
