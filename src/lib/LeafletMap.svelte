<script lang="ts">
import L from 'leaflet';
import { onMount } from 'svelte';
import { LeafletMap, TileLayer, Marker } from 'svelte-leafletjs';

export let zoom = 19;
export let lat;
export let lng;
export let recenter = false;

const wistronCneter = [lat, lng];

const mapOptions = {
  center: wistronCneter,
  zoom,
};
const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const tileLayerOptions = {
  minZoom: 15,
  maxZoom: 20,
  maxNativeZoom: 19,
  attribution: '© OpenStreetMap contributors',
};

const redIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

let leafletMap;

$: if (recenter && leafletMap) {
  if (lat && lng) {
    leafletMap.getMap().panTo([lat, lng]);
    recenter = false;
  }
}

onMount(async () => {
  const onMapClick = (e) => {
    lat = e.latlng.lat; //緯度
    lng = e.latlng.lng; //經度
  };
  leafletMap.getMap().on('click', onMapClick);
});
</script>

<div class="w-96 h-96">
  <LeafletMap bind:this={leafletMap} options={mapOptions}>
    <TileLayer url={tileUrl} options={tileLayerOptions} />
    {#if lat && lng}
      <Marker latLng={[lat, lng]} icon={redIcon} />
    {/if}
  </LeafletMap>
</div>
