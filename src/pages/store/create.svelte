<script lang="ts">
import { Input, Button } from 'flowbite-svelte';
import Map from '../../lib/Map.svelte';
let lat = 22.611624148667726;
let lng = 120.29340837137883;
$: coordinate = '';
let show = true;
const handleClick = () => {
	show = false;
	const [latitude, longitude] = coordinate.split(/,/g);
	lat = parseFloat(latitude.trim());
	lng = parseFloat(longitude.trim());
	setTimeout(() => (show = true), 0);
};
</script>

<div class="w-96 h-96">
	<div class="block">
		<Input bind:value={coordinate} class="mb-2" />
		<Button on:click={handleClick} class="mb-2">確認定位</Button>
	</div>
	{#if show}
		<Map {lat} {lng} />
	{/if}
</div>
