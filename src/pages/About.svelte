<script lang="ts">
import Card from '../lib/Card.svelte';
const stores = {
	message: '',
	data: [
		{ storeName: '太皇祖羊肉羹', nickName: '', speed: 4, delicious: 5, distance: 5, tags: '' },
		{ storeName: '真男饌牛肉麵王', nickName: '', speed: 4, delicious: 5, distance: 3, tags: '' },
		{ storeName: '蔡氏排骨炒飯', nickName: '教召炒飯', speed: 3.5, delicious: 5, distance: 2, tags: '' },
		{ storeName: '厚德福', nickName: '', speed: 3.5, delicious: 4, distance: 1, tags: '' },
	],
};
</script>

<div class="grid sm:grid-cols-2 md:grid-cols-6 gap-4">
	{#each stores.data as store}
		<Card
			title={store.nickName ? store.nickName : store.storeName}
			speed={store.speed}
			delicious={store.delicious}
			distance={store.distance} />
	{/each}
</div>
