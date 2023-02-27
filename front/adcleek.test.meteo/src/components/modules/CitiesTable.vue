<script setup>
import axios from 'axios';
const props = defineProps({
  cities: {
    type: Array,
    defaut: () => [],
  },
});

const emit = defineEmits(['fetch-city-data']);

const fetchCityData = async (insee) => {
  const result = await axios.get(`http://localhost:3000/meteo/${insee}`);
  emit('fetch-city-data', result.data);
};
</script>

<template>
  <section>
    <table>
      <thead>
        <tr>
          <th>Code INSEE</th>
          <th>City</th>
          <th>Population</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(city, index) in cities"
          :key="`row-${city.name}-${index}`"
          @click="fetchCityData(city.insee)"
        >
          <td>{{ city.insee }}</td>
          <td>{{ city.name }}</td>
          <td>{{ city.population }}</td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<style lang="scss" scoped>
table {
  text-align: left;

  thead {
    tr {
      border-bottom: 2px solid $color-text;
    }
  }

  th {
    padding: 1rem;

    &:first-child,
    &:last-child {
      width: 12vw;
    }
    &:nth-child(2) {
      width: 32vw;
    }
  }

  tbody {
    tr {
      border-top: thin solid $color-text;

      &:nth-child(n) {
        background-color: transparentize($color-text, 0.88);
      }

      &:nth-child(2n) {
        background-color: $color-bg;
      }
    }
  }

  td {
    padding: 0.5rem;
    padding-left: 1rem;
  }
}
</style>
