<script lang="ts">
import { onMount } from 'svelte';
import { sineIn } from 'svelte/easing';
import { AccordionItem, Accordion, List, Li, Drawer, Span, Img, Button, Badge, Label, Input } from 'flowbite-svelte';
import { Icon } from 'flowbite-svelte-icons';
import * as _ from 'lodash';
import { params } from '@roxi/routify';
import OrderName from '../../lib/OrderName.svelte';
import axios from '../../utils/GoogleApi';
import { loading, showMsg, hideHeader } from '../../stores';
import db from '../../utils/Database';

let hidden = true;
let total = 0;
let fullName = '';
let order = {
  menuUrl: '',
  orderName: '',
  status: '',
  storeName: '',
  items: [{ name: '', size: '', option: '', count: 1, price: 0 }],
};
let oriOrder = {
  menuUrl: '',
  orderName: '',
  status: '',
  storeName: '',
  items: { example: [{ name: '', size: '', option: '', count: 1, price: 0 }] },
};
let isOwner = false;

const triggerDrawer = () => {
  hidden = !hidden;
};

$: if (order.items && order.items.every((item) => item.name)) {
  order.items.push({
    name: '',
    size: '',
    option: '',
    price: 0,
    count: 1,
  });
} else {
  let size = order.items.filter((item) => item.name === '');
  if (size.length > 1) {
    order.items.pop();
  }
}

$: if (order.items.some((item) => item.price)) {
  total = _.sumBy(order.items, 'price');
}

onMount(async () => {
  hideHeader.update(() => true);
  const orderName = db.getOrderUserName();
  fullName = orderName.fullName;
  isOwner = await db.isOrderOwner($params.hashCode);
  loading.update(() => true);
  axios
    .post('getOrder', {
      sheetName: $params.hashCode,
    })
    .then((res) => {
      if (res.data.message === 'success') {
        let { result } = res.data;
        if (_.isEmpty(result.items)) {
          result.items = [{ name: '', size: '', option: '', count: 1, price: 0 }];
        } else {
          oriOrder = _.cloneDeep(result);
          result.items = result.items[orderName.fullName];
        }
        order = result;
      }
    })
    .finally(() => {
      loading.update(() => false);
    });
});

const handleSubmit = () => {
  const { items } = order;
  const its = items.filter((item) => item.name && item.size && item.count && item.price);
  const orderName = db.getOrderUserName();
  if (its.length > 0) {
    loading.update(() => true);
    axios
      .post('addOrder', {
        sheetName: $params.hashCode,
        name: orderName.fullName,
        items: its,
      })
      .then((res) => {
        if (res.data.message) {
          showMsg.set(res.data.message);
        }
      })
      .finally(() => {
        loading.update(() => false);
      });
  }
};

const handleClose = () => {
  loading.update(() => true);
  axios
    .post('closeOrder', {
      sheetName: $params.hashCode,
    })
    .then((res) => {
      const { message } = res.data;
      if (message) {
        showMsg.set(message);
      }
    })
    .finally(() => {
      loading.update(() => false);
    });
};

const handleDelete = () => {
  loading.update(() => true);
  axios
    .post('deleteOrder', {
      sheetName: $params.hashCode,
    })
    .then((res) => {
      const { message } = res.data;
      if (message) {
        showMsg.set(message);
        db.removeOrder($params.hashCode);
      }
    })
    .finally(() => {
      loading.update(() => false);
    });
};
</script>

<OrderName />
<div class="grid sm:grid-cols-1 lg:grid-cols-2 gap-4">
  <div class="block">
    <Badge href={order.menuUrl}>{order.menuUrl}</Badge>
    {#if order.menuUrl}
      <Img src={order.menuUrl} alt="Preview" />
    {/if}
  </div>
  <div>
    <div class="grid sm:grid-cols-1 lg:grid-cols-1 gap-4">
      <div class="block">
        <div class="grid sm:grid-cols-1 lg:grid-cols-4 gap-2 mb-4">
          <Button size="xs" on:click={handleSubmit}>送出</Button>
          <Span>總共: {total} 元</Span>
        </div>
        {#if isOwner}
          <div class="grid sm:grid-cols-1 lg:grid-cols-4 gap-2 mb-4">
            <Button size="xs" on:click={handleClose}>收單</Button>
            <Button size="xs" on:click={handleDelete}>結清</Button>
          </div>
        {/if}
        {#each order.items as item}
          <div class="grid sm:grid-cols-1 lg:grid-cols-5 gap-2 mb-4 pb-1 border border-sky-500 p-1">
            <Label class="space-y-2">
              <span>品項名稱</span>
              <Input bind:value={item.name} placeholder="珍珠奶茶" />
            </Label>
            <Label class="space-y-2">
              <span>選項</span>
              <Input bind:value={item.option} placeholder="多冰/糖正常" />
            </Label>
            <Label class="space-y-2">
              <span>Size</span>
              <Input bind:value={item.size} placeholder="ex:L or M or None" />
            </Label>
            <Label class="space-y-2">
              <span>數量</span>
              <Input type="number" bind:value={item.count} placeholder="1" />
            </Label>
            <Label class="space-y-2">
              <span>價錢</span>
              <Input type="number" bind:value={item.price} placeholder="1" />
            </Label>
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
      {#each Object.entries(oriOrder.items) as [name, o]}
        <AccordionItem>
          <span slot="header">{name.split('-')[0]}</span>
          <p class="mb-2 text-gray-500 dark:text-gray-400">
            <List tag="ul" list="none" class="max-w-md">
              {#each o as item}
                <Li class="pb-2">
                  <div class="flex items-center space-x-4 rtl:space-x-reverse">
                    <div class="flex-1 min-w-0">
                      <p class="text-sm font-medium text-gray-900 truncate dark:text-white">{item.name}</p>
                      <p class="text-sm text-gray-500 truncate dark:text-gray-400">{item.option}</p>
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
