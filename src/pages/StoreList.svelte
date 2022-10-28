<script lang="ts">
import { get } from 'svelte/store';
import Card from '../lib/Card.svelte';
import { inns, storeId } from '../store/stores';
import { navigate } from 'svelte-routing';
let stores = get(inns);
const handleClick = (idx: number) => {
	storeId.set(idx);
};
</script>

<div class="grid sm:grid-cols-2 md:grid-cols-5 gap-4">
	{#if stores}
		{#each stores as store, idx}
			<Card
				title={store.nickName ? store.nickName : store.storeName}
				speed={store.speed}
				delicious={store.delicious}
				distance={store.distance}
				time={store.time}
				on:click={() => handleClick(idx)} />
		{/each}
	{/if}
</div>
