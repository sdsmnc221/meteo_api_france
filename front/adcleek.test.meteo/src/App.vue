<script setup>
import CitiesTable from '@modules/CitiesTable.vue';

import '@/assets/scss/global/index.scss';

import axios from 'axios';
import { onMounted, ref } from 'vue';
import CityMeteo from './components/modules/CityMeteo.vue';

const cities = ref([]);
const meteoData = ref(null);

const fetchData = async () => {
  const cities = await axios.get('http://localhost:3000/cities', {
    'Content-Type': 'application/json',
  });
  return cities?.data;
};

const updateMeteo = (data) => {
  meteoData.value = data;
};

onMounted(async () => {
  const data = await fetchData();
  cities.value = data;
});
</script>

<template>
  <main>
    <CitiesTable
      v-if="cities.length > 0"
      :cities="cities"
      @fetch-city-data="updateMeteo"
    ></CitiesTable>
    <CityMeteo :data="meteoData" />
  </main>
</template>

<style scoped>
main {
  padding-left: 3rem;
}
</style>
