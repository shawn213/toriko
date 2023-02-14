<script lang="ts">
import { onMount } from 'svelte';
import { Span, ButtonGroup, Button, Card, Kbd, Avatar, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, TableSearch } from 'flowbite-svelte';
import * as e from '../../utils/Encoding';
import moment from 'moment';
import axios from '../../utils/Api';
import { loading } from '../../stores/stores';
import StarRating from '../../lib/Rating.svelte';

let delivery = { storeName: '', nickName: '', platform: '', nickPlatform: '', url: '', tags: '' };

const platforms = {
  'Uber Eats': 'https://i.imgur.com/5BtSyH4.png',
  Nidin: 'https://i.imgur.com/t9jLO0O.png',
  foodpanda: 'https://i.imgur.com/PnN0rJa.jpg',
};

interface IDelivery {
  storeName: string;
  nickName: string;
  delicious: number;
  tags: string;
  type: string;
  nickPlatform: string;
  platform: string;
  url: string;
}

let drinks: IDelivery[] = [];
let lunchs: IDelivery[] = [];
let ds: IDelivery[] = [];

onMount(async () => {
  loading.set(true);
  const token = e.crypto(import.meta.env.VITE_API_SALT, `findAllDeliver_${moment().format('YYYYMMDDHHmmss')}`);
  const res = await axios.get(import.meta.env.VITE_API_URL + `?token=${token}`);
  const { message, data } = res.data;
  if (!message) {
    const deliverys: IDelivery[] = data;
    deliverys.forEach((d) => {
      if (d.type === 'Drink') {
        drinks.push(d);
      } else {
        lunchs.push(d);
      }
    });
    drinks = drinks;
    lunchs = lunchs;
    ds = deliverys;
  }
  loading.set(false);
});

const openLink = (url: string) => {
  window.open(url, '_blank');
};

const handleClick = (type: string) => {
  if (type === 'Lunch') {
    delivery = lunchs[Math.floor(Math.random() * lunchs.length)];
  } else if (type === 'Drink') {
    delivery = drinks[Math.floor(Math.random() * drinks.length)];
  }
};

let searchTerm: string = '';

$: filteredDelivery = ds.filter(
  (item) => item.storeName.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
);
</script>

<div class="block">
  <div class="flex justify-center m-2">
    <ButtonGroup>
      <Button gradient shadow="green" color="green" on:click={() => handleClick('Lunch')}>午餐</Button>
      <Button gradient shadow="pink" color="pink" on:click={() => handleClick('Drink')}>飲料</Button>
    </ButtonGroup>
  </div>
  {#if delivery.storeName}
    <div class="flex justify-center">
      <Span>叫 {delivery.nickPlatform} 幫你送~</Span>
    </div>
    <div class="flex justify-center">
      <Card padding="sm" class="m-4 w-80">
        <div class="flex flex-col items-center pb-4">
          <Avatar size="lg" src={platforms[delivery.platform]} />
          <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">{delivery.storeName}</h5>
          <span class="text-sm text-gray-500 dark:text-gray-400">{delivery.nickName}</span>
          {#if delivery.url}
            <div class="flex mt-4 space-x-3 lg:mt-6">
              <Button on:click={() => openLink(delivery.url)}>前往</Button>
            </div>
          {/if}
          <div class="flex mt-4 space-x-3 lg:mt-6">
            {#if delivery && delivery.tags}
              {#each delivery.tags.split(',') as tag}
                <Kbd class="px-1 mr-1">{tag}</Kbd>
              {/each}
            {/if}
          </div>
        </div>
      </Card>
    </div>
  {/if}
  <div class="max-h-96 overflow-y-auto">
    <TableSearch placeholder="Search by maker name" hoverable={true} bind:inputValue={searchTerm}>
      <TableHead>
        <TableHeadCell>類別</TableHeadCell>
        <TableHeadCell>名稱</TableHeadCell>
        <TableHeadCell>簡稱</TableHeadCell>
        <TableHeadCell>美味</TableHeadCell>
        <TableHeadCell>平台</TableHeadCell>
        <TableHeadCell>連結</TableHeadCell>
      </TableHead>
      <TableBody class="divide-y">
        {#each filteredDelivery as item}
          <TableBodyRow>
            <TableBodyCell>{item.type === 'Drink' ? '飲料' : '午餐'}</TableBodyCell>
            <TableBodyCell>{item.storeName}</TableBodyCell>
            <TableBodyCell>{item.nickName}</TableBodyCell>
            <TableBodyCell>
              <StarRating rating={item.delicious} />
            </TableBodyCell>
            <TableBodyCell>
              <Avatar src={platforms[item.platform]} />
            </TableBodyCell>
            <TableBodyCell>
              <Button on:click={() => openLink(item.url)}>連結</Button>
            </TableBodyCell>
          </TableBodyRow>
        {/each}
      </TableBody>
    </TableSearch>
  </div>
</div>
