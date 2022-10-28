<script lang="ts">
import { Navbar, NavBrand, NavLi, NavUl, NavHamburger, Chevron, MegaMenu, Button } from 'flowbite-svelte';
import { Route, Link, Router, navigate } from 'svelte-routing';
import { onMount } from 'svelte';
import routes from '../routes';
import { inns, storeId } from '../store/stores';
import { get } from 'svelte/store';
import Store from '../pages/Store.svelte';
let currentPath: string = '/';
onMount(() => {
	currentPath = window.location.pathname;
	storeId.set(Math.floor(Math.random() * max));
});
let max = get(inns).length;
const handleClick = () => {
	storeId.set(Math.floor(Math.random() * max));
	navigate(import.meta.env.BASE_URL + 'random');
};
storeId.subscribe((value) => {
	navigate(import.meta.env.BASE_URL + 'random');
});
</script>

<div>
	<Router basepath="/toriko">
		<Navbar
			let:hidden
			let:toggle
			color="form"
			navClass="px-2 py-1 w-full left-0 border-b fixed"
			navDivClass="flex flex-wrap justify-between items-center">
			<NavBrand>
				<Link to="/" class="flex">
					<img src="https://svelte.dev/favicon.png" class="mr-3 h-6 sm:h-9" alt="Flowbite Logo" />
					<span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white"> 選擇障礙 </span>
				</Link>
			</NavBrand>
			<div class="flex md:order-2">
				<Button on:click={handleClick}>隨選</Button>
				<NavHamburger on:click={toggle} />
			</div>
			<NavUl {hidden} class="order-1">
				{#each routes as route}
					{#if route.children}
						<NavLi active={currentPath === route.path ? true : false}>
							<Chevron aligned>{route.name}</Chevron>
						</NavLi>
						{#each route.children as item}
							<MegaMenu>
								<Link to={route.path + item.path} on:click={() => (currentPath = route.path)}>
									{item.name}
								</Link>
							</MegaMenu>
						{/each}
					{:else}
						<NavLi active={route.path === currentPath ? true : false}>
							<Link to={route.path} on:click={() => (currentPath = route.path)}>{route.name}</Link>
						</NavLi>
					{/if}
				{/each}
			</NavUl>
		</Navbar>
		<div class="w-full px-4 pt-20">
			{#each routes as route}
				{#if route.children}
					{#each route.children as item}
						<Route path={route.path + item.path} component={item.component} />
					{/each}
				{:else}
					<Route path={route.path} component={route.component} />
				{/if}
			{/each}
			<Route path="random" component={Store} />
		</div>
	</Router>
</div>

<style>
</style>
