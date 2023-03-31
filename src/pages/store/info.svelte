<script lang="ts">
import { List, Li, Span, Kbd } from 'flowbite-svelte';
import { onMount, onDestroy } from 'svelte';
import _ from 'lodash';
import { get } from 'svelte/store';
import { storeId, inns, tempIdx } from '../../stores/stores';
import StarRating from '../../lib/Rating.svelte';
import Map from '../../lib/Map.svelte';
$: idx = -1;
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
  if (stores.length > 0) {
    const max = stores.length;
    const ary = get(tempIdx);
    let storeIdx = -1;
    do {
      storeIdx = Math.floor(Math.random() * max);
    } while (ary.indexOf(storeIdx) > -1);
    storeId.set(storeIdx);
    tempIdx.update((v) => [...v, storeIdx]);
  }
});
</script>

<div class="block">
  {#if idx > -1 && store}
    <div class="flex justify-center">
      <div class="font-black text-2xl dark:text-white">{store.storeName}</div>
      {#if store.nickName}
        <div class="text-md dark:text-white self-end">({store.nickName})</div>
      {/if}
      {#if store.isTemp}
        <Kbd class="py-1 ml-1 self-end">未審查</Kbd>
      {/if}
    </div>
    <div class="flex justify-center">
      <List tag="ul">
        <Li class="flex"><Span class="mr-2">效率:</Span><StarRating rating={store.speed} /></Li>
        <Li class="flex"><Span class="mr-2">美味:</Span><StarRating rating={store.delicious} /></Li>
        <Li class="flex"><Span class="mr-2">距離:</Span>{store.distance} 公尺</Li>
        <Li class="flex"><Span class="mr-2">路程:</Span>{_.ceil(store.time / 60)} 分鐘</Li>
      </List>
    </div>
    <div class="flex justify-center">
      <div class="w-96 h-96">
        <Map lat={store.latitude} lng={store.longitude} />
      </div>
    </div>
  {/if}
</div>
