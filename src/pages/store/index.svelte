<script lang="ts">
import { get } from 'svelte/store';
import { goto } from '@roxi/routify';
import Card from '../../lib/Card.svelte';
import { inns, storeId } from '../../stores';
let stores = get(inns);
const handleClick = (idx: number) => {
  storeId.update((v) => idx);
  $goto('/store/:storeIdx', { storeIdx: idx });
};
</script>

<div class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
  {#if stores}
    {#each stores as store, idx}
      <Card
        title={store.nickName ? store.nickName : store.storeName}
        speed={store.speed}
        delicious={store.delicious}
        distance={store.distance}
        time={store.time}
        {store}
        on:click={() => handleClick(idx)} />
    {/each}
  {/if}
</div>
