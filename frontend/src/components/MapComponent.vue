<template>
  <div v-if="center">
    <LMap :zoom="zoom" :center="center" class="map-leaflet">
      <LTileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
      ></LTileLayer>
      <LMarker :lat-lng="center"></LMarker>
    </LMap>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { LMap, LTileLayer, LMarker } from '@vue-leaflet/vue-leaflet';
import * as L from 'leaflet';

import 'leaflet/dist/leaflet.css';

const props = defineProps({
  latitude: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
});

const zoom = 13;

const center = computed(() => {
  return props.latitude && props.longitude
      ? [props.latitude, props.longitude]
      : [0, 0];
});
</script>

<style scoped>
.map-leaflet {
  height: 400px !important;
  width: 100% !important;
  z-index: 1;
  position: relative;
}
</style>
