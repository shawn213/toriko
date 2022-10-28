<script lang="ts">
import { layout } from '@roxi/routify';
import { Span } from 'flowbite-svelte';
</script>

<div class="block">
	<Span>test</Span>
	{#each $layout.children as node}
		<a class="dark:text-white" href={node.path}>{node.title}</a>
	{/each}
</div>
