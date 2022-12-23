<script lang="ts">
//@ts-nocheck
import { Navbar, NavBrand, NavUl, NavLi, Chevron, NavHamburger, MegaMenu, Button } from 'flowbite-svelte';
import { inns, storeId, tempIdx } from '../stores/stores';
import { get } from 'svelte/store';
import { goto, url } from '@roxi/routify';

const menu = [
  {
    name: '店家列表',
    href: '/store',
  },
  {
    name: '新增店家',
    href: '/store/create',
  },
];

let max = get(inns).length;
const handleClick = async () => {
  const ary = get(tempIdx);
  let storeIdx = -1;
  do {
    storeIdx = Math.floor(Math.random() * max);
  } while (ary.indexOf(storeIdx) > -1);
  storeId.set(storeIdx);
  tempIdx.update((v) => [...v, storeIdx]);
  $goto('/store/info');
};
tempIdx.subscribe((array) => {
  if (array.length >= max) {
    tempIdx.set([]);
  }
});
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
    <Button on:click={handleClick} size="xs" gradient color="lime">隨選</Button>
    <NavHamburger on:click={toggle} />
  </div>
  <NavUl {hidden} class="md:order-1">
    <NavLi href={$url('/')}>Home</NavLi>
    <NavLi><Chevron aligned>附近</Chevron></NavLi>
    <MegaMenu items={menu} let:item class="block">
      <a href={$url(item.href)} class="mx-1 hover:text-blue-600 dark:hover:text-blue-500">{item.name}</a>
    </MegaMenu>
    <NavLi href={$url('/tools/draw')}>抽籤</NavLi>
  </NavUl>
</Navbar>
