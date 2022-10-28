<script lang="ts">
import { List, Li, Span } from 'flowbite-svelte';
import StarRating from './Rating.svelte';
export let title: string = '測試店名';
export let speed: number = 0;
export let delicious: number = 0;
export let distance: string = '';
export let time: string = '';
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="dark:border-gray-700 shadow-md rounded-md border border-gray-300 p-3" on:click>
	<div class="text-xl font-bold flex justify-center dark:text-white">{title}</div>
	<div class="flex justify-center">
		<List tag="ul" class="space-y-1">
			<Li class="flex"><Span class="mr-3">速度:</Span><StarRating rating={speed} /></Li>
			<Li class="flex"><Span class="mr-3">美味:</Span><StarRating rating={delicious} /></Li>
			<Li class="flex"><Span class="mr-3">距離:</Span>{distance}</Li>
			<Li class="flex"><Span class="mr-3">路程:</Span>{time}</Li>
		</List>
	</div>
</div>
