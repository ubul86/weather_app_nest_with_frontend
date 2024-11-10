import apiClient from './api.service';

export default {
    fetchCities() {
        try {
            return apiClient.get(`/city`).then(response => response.data.data);
        }
        catch(error) {
            console.error('Error fetching cities:', error);
            throw error;
        }
    },
    async getCityByCoordinates(latitude, longitude) {
        try {
            const response = await apiClient.get(`/city/get-city-by-coords`, {
                params: { latitude, longitude }
            });
            return response.data.data;
        } catch (error) {
            console.error('Error fetching city by coordinates:', error);
            throw error;
        }
    },
    async getCityNameByCoordinates(latitude, longitude)  {
        try {
            const response = await apiClient.get(`/city/get-city-name-by-coords`, {
                params: { latitude, longitude }
            });
            return response.data.data;
        } catch (error) {
            console.error('Error fetching city by coordinates:', error);
            throw error;
        }
    },
    async saveCity(cityName, latitude, longitude) {
        try {
            const response = await apiClient.post('/find-by-name-or-create', {
                name: cityName,
                latitude,
                longitude
            });
            return response.data.data;
        } catch (error) {
            console.error('Error saving new city:', error);
            throw error;
        }
    }
};
