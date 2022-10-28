<script lang="ts">
import { onMount } from 'svelte';
import Layout from './layouts/Layout.svelte';
import axios from 'axios';
import moment from 'moment';
import { inns } from './store/stores';

onMount(async () => {
	const date = moment().format('DD');
	let stores = JSON.parse(localStorage.getItem('stores'));
	if (!stores || stores.date !== date) {
		const res = await axios.get(import.meta.env.VITE_API_URL);
		const { message, data } = res.data;
		if (!message) {
			stores = { stores: data, date };
			localStorage.setItem('stores', JSON.stringify(stores));
		}
	}
	inns.set(stores.stores);
});
</script>

<Layout />
