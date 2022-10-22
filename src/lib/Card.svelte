<script lang="ts">
import { List, Li, Span } from 'flowbite-svelte';
import StarRating from 'svelte-star-rating';
export let title: string = '測試店名';
export let speed: number = 0;
export let delicious: number = 0;
export let distance: number = 0;
const config = {
	emptyColor: 'hsl(240, 80%, 85%)',
	showText: true,
};
</script>

<div class="dark:border-gray-700 shadow-md rounded-md border border-gray-300 p-3">
	<div class="text-xl font-bold flex justify-center dark:text-white">{title}</div>
	<div class="flex justify-center">
		<List tag="ul">
			<Li class="flex"><Span>速度:</Span><StarRating rating={speed} {config} /></Li>
			<Li class="flex"><Span>美味:</Span><StarRating rating={delicious} {config} /></Li>
			<Li class="flex"><Span>距離:</Span><StarRating rating={distance} {config} /></Li>
		</List>
	</div>
</div>
