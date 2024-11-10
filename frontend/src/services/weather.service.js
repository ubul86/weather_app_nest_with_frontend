import apiClient from './api.service';

export default {
    fetchWeatherByCity(cityName) {
        try {
            return apiClient.get(`/weather/${cityName}`).then(response => response.data.data);
        }
        catch(error) {
            console.error('Error fetching cities:', error);
            throw error;
        }

    },
};
