<script lang="ts">
import { List, Li, Span } from 'flowbite-svelte';
import { url, page } from '@roxi/routify';
import { onMount } from 'svelte';
import { get } from 'svelte/store';
import { storeId, inns } from '../../stores/stores';
import StarRating from '../../lib/Rating.svelte';
import Map from '../../lib/Map.svelte';
$: idx = 0;
let store: any;
$: stores = get(inns);
onMount(() => {
	storeId.subscribe((value) => {
		idx = value;
		if (stores) {
			store = undefined;
			setTimeout(() => (store = stores[value]), 0);
		}
	});
});
</script>

<div class="block">
	{#if store}
		<div class="flex justify-center">
			<div class="font-black text-2xl dark:text-white">{store.storeName}</div>
			{#if store.nickName}
				<div class="text-md dark:text-white self-end">({store.nickName})</div>
			{/if}
		</div>
		<div class="flex justify-center">
			<List tag="ul">
				<Li class="flex"><Span class="mr-2">速度:</Span><StarRating rating={store.speed} /></Li>
				<Li class="flex"><Span class="mr-2">美味:</Span><StarRating rating={store.delicious} /></Li>
				<Li class="flex"><Span class="mr-2">距離:</Span>{store.distance}</Li>
				<Li class="flex"><Span class="mr-2">路程:</Span>{store.time}</Li>
			</List>
		</div>
		<div class="flex justify-center">
			<div class="w-96 h-96">
				<Map lat={store.latitude} lng={store.longitude} />
			</div>
		</div>
	{/if}
</div>
