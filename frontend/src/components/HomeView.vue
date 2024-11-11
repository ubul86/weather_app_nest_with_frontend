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

    <v-card outlined class="weather-card">
      <v-card-text v-if="weatherData.current">
        <div class="weather-info">
          <div class="left">
            <h3>{{ cityStore.selectedCity?.name }}</h3>
            <p>{{ weatherData.current.temp_c }}°C</p>
          </div>
          <div class="right">
            <v-img :src="`https:${weatherData.current.condition.icon}`" alt="Weather icon" contain class="weather-icon"></v-img>
            <p>{{ weatherData.current.condition.text }}</p>
          </div>
        </div>
      </v-card-text>
    </v-card>
    <WeatherChart />
  </div>

</template>

<script setup>

import socket from '../bootstrap.js';

import { computed, onMounted, watch } from 'vue';
import { useCityStore } from '../stores/city.store.js';
import { useWeatherStore } from '../stores/weather.store.js';
import { VCard, VCardText, VImg } from 'vuetify/components';

import MapComponent from './MapComponent.vue';
import WeatherChart from "./WeatherChart.vue";

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
const weatherData = computed(() => weatherStore.weatherData);

</script>

<style scoped>
.weather-card {
  width: 300px;
  background-color: white;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid #e0e0e0;
}

.weather-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.left {
  display: flex;
  flex-direction: column;
  text-align: left;
}

.right {
  text-align: center;
}

.weather-icon {
  width: 48px;
  height: 48px;
}
</style>
