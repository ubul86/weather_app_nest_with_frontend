<template>
  <div v-if="weatherStore.weatherData">
    <h2>Daily Temperature of {{ weatherStore.weatherData?.location?.name }}</h2>
    <Line :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup>
import { computed, watch } from 'vue';
import { Line } from 'vue-chartjs';
import { Chart, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';
import { useWeatherStore } from '../stores/weather.store.js';

Chart.register(LineElement, CategoryScale, LinearScale, PointElement);

const weatherStore = useWeatherStore();

const hourlyData = computed(() => weatherStore.weatherData?.forecast?.forecastday?.[0]?.hour || []);

const chartData = computed(() => ({
  labels: hourlyData.value.map(entry => entry.time.split(' ')[1]),
  datasets: [
    {
      label: 'Temperature (°C)',
      data: hourlyData.value.map(entry => entry.temp_c),
      borderColor: 'rgba(75, 192, 192, 1)',
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      tension: 0.4,
    },
  ],
}));

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: true,
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      title: {
        display: true,
        text: 'Temperature (°C)',
      },
    },
    x: {
      title: {
        display: true,
        text: 'Time',
      },
    },
  },
};

watch(weatherStore, (newVal) => {
  if (!newVal.weatherData) {
    console.log("Weather data is not loaded yet.");
  }
});
</script>
