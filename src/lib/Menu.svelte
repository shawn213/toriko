<script lang="ts">
//@ts-nocheck
import { Navbar, NavBrand, NavUl, NavLi, NavHamburger, MegaMenu, Button } from 'flowbite-svelte';
import { Icon } from 'flowbite-svelte-icons';
import { restaurants, tempIdx, storeId, loading, showMsg } from '../stores';
import { get } from 'svelte/store';
import { goto, url } from '@roxi/routify';
import { updateHoliday, updateStore } from '../utils/Update';

const menus = [
  { name: 'Home', href: '/' },
  {
    name: '附近',
    childs: [
      {
        name: '店家列表',
        href: '/store',
        icon: 'database-solid',
      },
      {
        name: '新增店家',
        href: '/store/create',
        icon: 'map-pin-alt-solid',
      },
    ],
  },
  // {
  //   name: '訂便當',
  //   childs: [
  //     {
  //       name: '開團',
  //       href: '/order/create',
  //       icon: 'file-plus-solid',
  //     },
  //   ],
  // },
  {
    name: '線上工具',
    childs: [
      {
        name: '抽籤',
        href: '/tools/draw',
        icon: 'inbox-solid',
      },
      {
        name: '加解密',
        href: '/tools/encrypt',
        icon: 'lock-solid',
      },
      {
        name: '工作時數',
        href: '/tools/work',
        icon: 'calendar-month-solid',
      },
      {
        name: '調幅',
        href: '/tools/magnitudes',
        icon: 'chart-line-up-solid',
      },
      {
        name: 'json格式化',
        href: '/tools/json',
        icon: 'code-solid',
      },
      {
        name: 'mybatis',
        href: '/tools/mybatis',
        icon: 'code-solid',
      },
      {
        name: 'sql-formatter',
        href: '/tools/sql',
        icon: 'code-solid',
      },
    ],
  },
];

let max = get(restaurants).length;
const handleClick = async () => {
  const ary = get(tempIdx);
  let storeIdx = -1;
  do {
    storeIdx = Math.floor(Math.random() * max);
  } while (ary.indexOf(storeIdx) > -1);
  tempIdx.update((v) => [...v, storeIdx]);
  storeId.update((v) => storeIdx);
  $goto('/store/:storeIdx', { storeIdx });
};
tempIdx.subscribe((array) => {
  if (array.length >= max) {
    tempIdx.set([]);
  }
});
const handleUpdate = async () => {
  loading.update((v) => true);
  try {
    await updateHoliday();
    await updateStore();
    showMsg.update((v) => '已更新最新資料');
  } catch (e) {
    showMsg.update((v) => '後端 server 有問題請五分鐘後在試');
  } finally {
    loading.update((v) => false);
  }
};
</script>

<Navbar
  let:hidden
  let:toggle
  color="form"
  navClass="px-2 py-1 w-full left-0 border-b"
  navDivClass="flex flex-wrap justify-between items-center">
  <NavBrand>
    <a href={$url('/')} class="flex">
      <img src="https://svelte.dev/favicon.png" class="mr-3 h-6 sm:h-9" alt="Flowbite Logo" />
      <span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white"> 選擇障礙 </span>
    </a>
  </NavBrand>
  <div class="flex md:order-2">
    <Button class="mr-2" on:click={handleUpdate}><Icon name="rotate-outline" class="w-5 h-5" /></Button>
    <Button on:click={handleClick} size="lg" gradient>隨選</Button>
    <NavHamburger on:click={toggle} />
  </div>
  <NavUl {hidden} class="md:order-1">
    {#each menus as menu}
      {#if menu.childs}
        <NavLi
          >{menu.name}<Icon
            name="caret-down-solid"
            class="w-3 h-3 ml-2 text-primary-800 dark:text-white inline" /></NavLi>
        <MegaMenu items={menu.childs} let:item>
          <a href={$url(item.href)} class="flex items-center hover:text-primary-600 dark:hover:text-primary-500 mr-2">
            <span class="sr-only">{item.name}</span>
            <svelte:component
              this={Icon}
              name={item.icon ? item.icon : 'user-circle-outline'}
              class="w-4 h-4 mr-2" />{item.name}
          </a>
        </MegaMenu>
      {:else}
        <NavLi href={$url(menu.href)}>{menu.name}</NavLi>
      {/if}
    {/each}
  </NavUl>
</Navbar>
