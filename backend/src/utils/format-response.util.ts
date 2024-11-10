export const formatCityResponse = (city: any) => {
  return {
    id: city._id,
    name: city.name,
    title: city.name,
    latitude: city.latitude,
    longitude: city.longitude,
  };
};
