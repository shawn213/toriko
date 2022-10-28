<script lang="ts">
import { Navbar, NavBrand, NavLi, NavUl, NavHamburger, Button } from 'flowbite-svelte';
import { inns, storeId } from '../stores/stores';
import { get } from 'svelte/store';
import { url, goto, isActive } from '@roxi/routify';

const routes = [
	{
		name: 'Home',
		path: '/',
	},
	{
		name: 'List',
		path: '/store',
	},
	{
		name: 'Info',
		path: '/store/info',
	},
];

let max = get(inns).length;
const handleClick = () => {
	storeId.set(Math.floor(Math.random() * max));
	$goto('/store/info');
};
</script>

<div>
	<Navbar
		let:hidden
		let:toggle
		color="form"
		navClass="px-2 py-1 w-full left-0 border-b fixed"
		navDivClass="flex flex-wrap justify-between items-center">
		<NavBrand>
			<a href={import.meta.env.BASE_URL} class="flex">
				<img src="https://svelte.dev/favicon.png" class="mr-3 h-6 sm:h-9" alt="Flowbite Logo" />
				<span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white"> 選擇障礙 </span>
			</a>
		</NavBrand>
		<div class="flex md:order-2">
			<Button on:click={handleClick} size="xs" outline>隨選</Button>
			<NavHamburger on:click={toggle} />
		</div>
		<NavUl {hidden} class="order-1">
			{#each routes as route}
				<NavLi active={$isActive(route.path)}>
					<a href={$url(route.path)}>{route.name}</a>
				</NavLi>
			{/each}
		</NavUl>
	</Navbar>
	<div class="w-full px-4 pt-20">
		<slot />
	</div>
</div>

<style>
</style>
