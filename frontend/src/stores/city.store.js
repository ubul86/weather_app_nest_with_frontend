import { defineStore } from 'pinia';
import cityService from '../services/city.service.js';

export const useCityStore = defineStore('city', {
    state: () => ({
        cities: [],
        selectedCity: null,
    }),
    actions: {
        async fetchCities() {
            try {
                this.cities = await cityService.fetchCities();
            } catch (error) {
                console.error('Error in fetching cities:', error);
            }
        },
        async saveCity(cityName, latitude, longitude) {
            try {
                const newCity = await cityService.saveCity(cityName, latitude, longitude);
                this.cities.push(newCity);
                this.setSelectedCity(newCity);
            } catch (error) {
                console.error('Error saving new city:', error);
            }
        },
        async fetchCityFromLocation() {
            const storedCity = localStorage.getItem('selectedCity');
            if (storedCity) {
                this.selectedCity = JSON.parse(storedCity);
                return;
            }

            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;
                    try {
                        let city = await cityService.getCityByCoordinates(latitude, longitude);

                        if (!city) {
                            const data = await cityService.getCityNameByCoordinates(latitude, longitude);
                            city = await cityService.saveCity(data.city, latitude, longitude);
                        }

                        this.setSelectedCity(city);
                    } catch (error) {
                        console.error('Error fetching city by coordinates or saving new city:', error);
                    }
                },
                (error) => {
                    console.log('Geolocation error:', error);
                }
            );
        },
        setSelectedCity(city) {
            this.selectedCity = city;
            localStorage.setItem('selectedCity', JSON.stringify(city));
        },
        loadCityFromLocalStorage() {
            const savedCity = JSON.parse(localStorage.getItem('selectedCity'));
            if (savedCity) {
                this.selectedCity = savedCity;
            }
        },
    },
});
