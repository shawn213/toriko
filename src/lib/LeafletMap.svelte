<script lang="ts">
import leaflet from 'leaflet';
import { onMount } from 'svelte';
import { LeafletMap, TileLayer, Marker } from 'svelte-leafletjs';

const wistronCneter = [22.61321821006927, 120.29396187592799];

const mapOptions = {
  center: wistronCneter,
  zoom: 19,
};
const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const tileLayerOptions = {
  minZoom: 15,
  maxZoom: 20,
  maxNativeZoom: 19,
  attribution: '© OpenStreetMap contributors',
};

let leafletMap;

onMount(async () => {
  const L = leaflet;
  // if (lat && lng) {
  //   const bounds = new L.LatLngBounds([wistronCneter, [lat, lng]]);
  //   leafletMap.getMap().fitBounds(bounds);
  // } else {
  //   leafletMap.getMap().panTo(L.latLng(22.61321821006927, 120.29396187592799));
  //   leafletMap.getMap().setZoom(18);
  // }
  const onMapClick = (e) => {
    let lat = e.latlng.lat; //緯度
    let lng = e.latlng.lng; //經度
    L.popup().setLatLng(e.latlng).setContent(`緯度：${lat}<br/>經度：${lng}`).openOn(leafletMap.getMap());
  };
  leafletMap.getMap().on('click', onMapClick);
});
</script>

<div class="w-96 h-96">
  <LeafletMap bind:this={leafletMap} options={mapOptions}>
    <TileLayer url={tileUrl} options={tileLayerOptions} />
  </LeafletMap>
</div>
