<script setup>
import MeteoCard from '@elements/MeteoCard.vue';
const props = defineProps({
  data: {
    type: Object,
    default: null,
  },
});
</script>

<template>
  <section class="city-meteo">
    <h1>
      {{ !data ? 'Veuillez cliquer sur une ville dans la liste' : data.name }}
    </h1>
    <div class="city-meteo__info" v-if="data">
      <MeteoCard title="Température" :info="data.weather + ' degré C'" />
      <MeteoCard title="SOLEIL" :info="data.sunHours + 'h'" />
      <MeteoCard title="Probabilité Fog" :info="data.probafog + '%'" />
      <MeteoCard title="Probabilité Rain" :info="data.probarain + '%'" />
      <MeteoCard title="Probabilité Wind" :info="data.probawind + '%'" />
    </div>
  </section>
</template>

<style lang="scss" scoped>
.city-meteo {
  width: 36vw;
  position: fixed;
  top: 0;
  right: 1rem;

  &__info {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
  }
}
</style>
