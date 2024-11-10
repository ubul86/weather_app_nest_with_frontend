import { defineStore } from 'pinia';
import weatherService from '../services/weather.service.js';

export const useWeatherStore = defineStore('weather', {
    state: () => ({
        weatherData: [],
    }),
    actions: {
        async fetchWeather(cityName) {
            try {
                this.weatherData = await weatherService.fetchWeatherByCity(cityName);
            } catch (error) {
                console.error('Error fetching weather data:', error);
            }
        },
    },
});
