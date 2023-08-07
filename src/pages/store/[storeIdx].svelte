<script lang="ts">
import { List, Li, Span, Kbd, Breadcrumb, BreadcrumbItem } from 'flowbite-svelte';
import { onMount, onDestroy } from 'svelte';
import _ from 'lodash';
import { get } from 'svelte/store';
import { restaurants, storeId } from '../../stores';
import StarRating from '../../lib/Rating.svelte';
import Map from '../../lib/Map.svelte';
import { params, url } from '@roxi/routify';
$: idx = -1;
let store: any;
$: stores = get(restaurants);
onMount(() => {
  if (stores.length > 0) {
    storeId.subscribe((v) => {
      idx = -1;
      store = stores[v];
      setTimeout(() => {
        idx = v;
      });
    });
    if ($params.storeIdx) {
      console.log($params.storeIdx);
      idx = -1;
      store = stores[$params.storeIdx];
      setTimeout(() => {
        idx = $params.storeIdx;
      });
    }
  } else {
    const ss = JSON.parse(localStorage.getItem('stores'));
    if ($params.storeIdx) {
      idx = $params.storeIdx;
      store = ss.stores[idx];
    }
  }
});
</script>

<div class="block">
  {#if idx > -1 && store}
    <Breadcrumb aria-label="Default breadcrumb example">
      <BreadcrumbItem href={$url('/')} home>Home</BreadcrumbItem>
      <BreadcrumbItem href={$url('/store')}>店家列表</BreadcrumbItem>
      <BreadcrumbItem>{store.storeName}</BreadcrumbItem>
    </Breadcrumb>
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
        <Li class="flex"><Span class="mr-2">距離:</Span><Span>{store.distance} 公尺</Span></Li>
        <Li class="flex"><Span class="mr-2">路程:</Span><Span>{_.ceil(store.time / 60)} 分鐘</Span></Li>
      </List>
    </div>
    <div class="flex justify-center">
      <div class="w-96 h-96">
        <Map lat={store.latitude} lng={store.longitude} />
      </div>
    </div>
  {/if}
</div>
