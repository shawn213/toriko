<script lang="ts">
import { List, Li, Span, Kbd } from 'flowbite-svelte';
import StarRating from './Rating.svelte';
import _ from 'lodash';
export let title: string = '測試店名';
export let speed: number = 0;
export let delicious: number = 0;
export let distance: number;
export let time: number;
export let store;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="dark:border-gray-700 shadow-md rounded-md border border-gray-300 p-3" on:click>
  <div class="flex justify-center">
    <div class="text-xl font-bold dark:text-white">{title}</div>
    {#if store.isTemp}
      <Kbd class="py-1 ml-1 self-end">未審查</Kbd>
    {/if}
  </div>
  <div class="flex justify-center">
    <List tag="ul" class="space-y-1">
      <Li class="flex"><Span class="mr-3">效率:</Span><StarRating rating={speed} /></Li>
      <Li class="flex"><Span class="mr-3">美味:</Span><StarRating rating={delicious} /></Li>
      <Li class="flex"><Span class="mr-3">距離:</Span>{distance} 公尺</Li>
      <Li class="flex"><Span class="mr-3">路程:</Span>{_.ceil(time / 60)} 分鐘</Li>
      <Li class="flex flex-wrap">
        {#if store && store.tags}
          {#each store.tags.split(',') as tag}
            <Kbd class="px-1 mr-1">{tag}</Kbd>
          {/each}
        {/if}
      </Li>
    </List>
  </div>
</div>
