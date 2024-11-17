import { defineStore } from 'pinia'

export const useMapStore = defineStore('map', () => {
  // Reactive Variables Start
  const properties = ref([]);
  // Reactive Variables End

  // Variables Start
  const existingLocations = [];
  // Variables End

  // Haversine Start
  const haversine = (lat1, lon1, lat2, lon2) => {
    // Calculate distance between two coordinates
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance;
  };
  // Haversine End


  // Generate Random Property Start
  const generateRandomProperty = (id) => {
    const price = Math.floor(Math.random() * (1500000 - 100000) + 100000);
    const type = Math.random() < 0.5 ? "House" : "Apartment";
    const bedrooms = Math.floor(Math.random() * 5) + 1;
    const bathrooms = Math.floor(Math.random() * 3) + 1;
    const sqft = Math.floor(Math.random() * (4000 - 800) + 800);

    let lat, lng;
    let isTooClose = true;

    while (isTooClose) {
      lat = 51.3 + Math.random() * 0.6;
      lng = -0.4 + Math.random() * 0.3;

      isTooClose = existingLocations.some(location => {
        return haversine(lat, lng, location.lat, location.lng) < 1;
      });
    }

    const address = `${Math.floor(Math.random() * 500) + 1} ${type === "House" ? "Family" : "Downtown"} Road, London`;
    const image = type === "House" ? "house.jpg" : "apartment.jpg";
    const newProperty = {
      id,
      title: `${type} in London`,
      price,
      type,
      bedrooms,
      bathrooms,
      sqft,
      location: { lat, lng },
      address,
      image
    };

    existingLocations.push(newProperty.location);

    return newProperty;
  };
  // Generate Random Property End

  // Get Properties Start
  const getProperties = computed(() => properties.value);
  // Get Properties End


  for (let i = 1; i <= 50; i++) {
    properties.value.push(generateRandomProperty(i));
  }


  return {
    properties,
    getProperties
  };
});
