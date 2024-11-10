<template>
  <div>
    <v-select
        v-model="cityStore.selectedCity"
        :items="cities"
        label="Select a city"
        item-text="name"
        item-value="id"
    />

    <MapComponent
        v-if="cityStore.selectedCity"
        :latitude="cityStore.selectedCity?.latitude"
        :longitude="cityStore.selectedCity?.longitude"
    />
  </div>
</template>

<script setup>
import { computed, onMounted, watch } from 'vue';
import MapComponent from './MapComponent.vue';
import { useCityStore } from '../stores/city.store.js';
import { useWeatherStore } from '../stores/weather.store.js';
import socket from '../bootstrap.js';

const cityStore = useCityStore();
const weatherStore = useWeatherStore();

onMounted(async () => {
  await cityStore.fetchCities();
  await cityStore.fetchCityFromLocation();
  cityStore.loadCityFromLocalStorage();

  if (cityStore.selectedCity) {
    weatherStore.fetchWeather(cityStore.selectedCity.name);
  }

  socket.on('weatherUpdate', (data) => {
    if (data.city === cityStore.selectedCity?.name) {
      weatherStore.weatherData = data.weatherData;
    }
  });
});

watch(
    () => cityStore.selectedCity,
    (newCityId) => {
      if (newCityId) {
        const selectedCity = cityStore.cities.find((city) => city.id === newCityId);
        if (selectedCity) {
          cityStore.setSelectedCity(selectedCity);
          weatherStore.fetchWeather(selectedCity.name);
        }
      }
    }
);

const cities = computed(() => cityStore.cities);

</script>
