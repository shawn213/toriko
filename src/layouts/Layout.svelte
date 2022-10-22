<script lang="ts">
import { Navbar, NavBrand, NavLi, NavUl, NavHamburger } from 'flowbite-svelte';
import { Route, Link, Router } from 'svelte-routing';
import { onMount } from 'svelte';
import routes from '../routes';
let currentPath: string = '/';
onMount(() => (currentPath = window.location.pathname));
</script>

<div>
	<Router>
		<Navbar let:hidden let:toggle color="form" navClass="px-2 sm:px-4 py-2.5 w-full z-20 top-0 left-0 border-b fixed">
			<NavBrand href="/">
				<img src="/svelte.svg" class="mr-3 h-6 sm:h-9" alt="Flowbite Logo" />
				<span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white"> Flowbite </span>
			</NavBrand>
			<NavHamburger on:click={toggle} />
			<NavUl {hidden}>
				{#each routes as route}
					<NavLi active={route.path === currentPath ? true : false}>
						<Link to={route.path} on:click={() => (currentPath = route.path)}>{route.name}</Link>
					</NavLi>
				{/each}
			</NavUl>
		</Navbar>
		<div class="w-full px-4 pt-20">
			{#each routes as route}
				<Route path={route.path} component={route.component} />
			{/each}
		</div>
	</Router>
</div>

<style>
</style>
