<script lang="ts">
import Map from '@anoram/leaflet-svelte';
export let lat: number;
export let lng: number;
let options = {
	recenter: true,
	zoom: 19,
	maxZoom: 18,
	zIndex: 0,
	markers: [
		{
			lat: 22.61321821006927,
			lng: 120.29396187592799,
		},
		{
			lat,
			lng,
			icon: {
				iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
				shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
			},
		},
	],
	attributionControl: false,
	controls: {
		zoomControl: false,
	},
};
</script>

<Map class="z-0" {options} />
