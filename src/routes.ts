import Home from "./pages/Home.svelte";
import About from "./pages/About.svelte";

export default [
	{
		name: 'Home',
		path: '/',
		component: Home,
	},
	{
		name: 'About',
		path: '/about',
		component: About,
	}
]