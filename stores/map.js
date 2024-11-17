import { defineStore } from 'pinia'

export const useMapStore = defineStore('map', () =>{

  const properties = ref([
    {
      id: 1,
      title: "Modern Downtown Apartment",
      price: 450000,
      type: "Apartment",
      bedrooms: 2,
      bathrooms: 2,
      sqft: 1200,
      location: {
        lat: 51.5074,  
        lng: -0.1278
      },
      address: "123 Downtown Street, London",
      image: "apartment1.jpg"
    },
    {
      id: 2,
      title: "Suburban Family Home",
      price: 750000,
      type: "House",
      bedrooms: 4,
      bathrooms: 3,
      sqft: 2500,
      location: {
        lat: 51.5225,
        lng: -0.1389
      },
      address: "456 Family Road, London",
      image: "house1.jpg"
    }])



    return {
      properties
   
    }
})