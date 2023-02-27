<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  info: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div class="meteo-card">
    <h2>{{ title }}</h2>
    <p>{{ info }}</p>
  </div>
</template>

<style lang="scss" scoped>
.meteo-card {
  background-color: white;
  padding: 1rem;
  border: thin solid transparentize($color-text, 0.88);
  border-radius: 10px;
  width: 40%;
  min-height: 160px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-bottom: 1rem;

  h2 {
    margin-bottom: 1rem;
    font-weight: bold;
  }

  &:nth-of-type(2n) {
    margin-left: 1rem;
  }
}
</style>
