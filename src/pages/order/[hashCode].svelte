<script lang="ts">
import { onMount } from 'svelte';
import { sineIn } from 'svelte/easing';
import {
  AccordionItem,
  Accordion,
  List,
  Li,
  Drawer,
  Span,
  Img,
  FloatingLabelInput,
  Button,
  Badge,
  Hr,
} from 'flowbite-svelte';
import { Icon } from 'flowbite-svelte-icons';
import * as _ from 'lodash';
import { params, url } from '@roxi/routify';

let orders = {
  Shawn: {
    name: 'Shawn',
    items: [
      { name: '9號餐', size: 'N', remark: '原味', count: 1, price: 99 },
      { name: '汽水', size: 'L', remark: '去冰', count: 1, price: 5 },
    ],
  },
};

let hidden = true;
let total = 0;
let menuImg = 'https://i.imgur.com/31tpNap.jpg';

const triggerDrawer = () => {
  hidden = !hidden;
};

$: if (orders['Shawn'].items.every((item) => item.name)) {
  orders.Shawn.items.push({
    name: '',
    size: '',
    remark: '',
    price: 0,
    count: 1,
  });
} else {
  let size = orders.Shawn.items.filter((item) => item.name === '');
  if (size.length > 1) {
    orders.Shawn.items.pop();
  }
}

$: if (orders.Shawn.items.some((item) => item.price)) {
  total = _.sumBy(orders.Shawn.items, 'price');
}

onMount(() => {
  console.log($params.hashCode);
});
</script>

<div class="grid sm:grid-cols-1 lg:grid-cols-2 gap-4">
  <div class="block">
    <Badge href={menuImg}>{menuImg}</Badge>
    <Img src={menuImg} alt="Preview" />
  </div>
  <div>
    <div class="grid sm:grid-cols-1 lg:grid-cols-2 gap-4">
      <div class="block">
        <div class="grid sm:grid-cols-1 lg:grid-cols-4 gap-2 mb-4">
          <Button size="xs">送出</Button>
          <Span>{total}</Span>
        </div>
        {#each orders['Shawn'].items as item}
          <div class="grid sm:grid-cols-1 lg:grid-cols-5 gap-2 mb-4 pb-1">
            <FloatingLabelInput label="品項" bind:value={item.name} />
            <FloatingLabelInput label="備註" bind:value={item.remark} />
            <FloatingLabelInput label="Size" bind:value={item.size} />
            <FloatingLabelInput label="數量" type="number" bind:value={item.count} />
            <FloatingLabelInput label="價錢" type="number" bind:value={item.price} />
          </div>
        {/each}
      </div>
    </div>
  </div>
  <Span class="fixed right-5 top-15"><Icon name="cart-outline" class="w-5 h-5" on:click={triggerDrawer} /></Span>
</div>
<Drawer
  placement="right"
  transitionType="fly"
  transitionParams={{
    x: 320,
    duration: 200,
    easing: sineIn,
  }}
  bind:hidden
  id="sidebar6">
  <p class="mb-6 text-sm text-gray-500 dark:text-gray-400">
    <Accordion flush>
      {#each Object.entries(orders) as [name, order]}
        <AccordionItem>
          <span slot="header">{order.name}</span>
          <p class="mb-2 text-gray-500 dark:text-gray-400">
            <List tag="ul" list="none" class="max-w-md">
              {#each order.items as item}
                <Li class="pb-2">
                  <div class="flex items-center space-x-4 rtl:space-x-reverse">
                    <div class="flex-1 min-w-0">
                      <p class="text-sm font-medium text-gray-900 truncate dark:text-white">{item.name}</p>
                      <p class="text-sm text-gray-500 truncate dark:text-gray-400">{item.remark}</p>
                    </div>
                    <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                      {item.price}
                    </div>
                  </div>
                </Li>
              {/each}
            </List>
          </p>
        </AccordionItem>
      {/each}
    </Accordion>
  </p>
</Drawer>
