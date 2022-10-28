import Home from "./pages/Home.svelte";
import StoreList from "./pages/StoreList.svelte";

export default [
	{
		name: 'Home',
		path: '/',
		component: Home,
	},
	{
		name: 'Store',
		path: 'store',
		component: StoreList,
		children: [
			{
				name: 'List',
				path: 'list',
				component: StoreList,
			}
		]
	}
]