<script lang="ts">
import { Alert } from 'flowbite-svelte';
import { showMsg } from '../stores/stores';
import Menu from '../lib/Menu.svelte';

let message = undefined;
const handleClose = () => {
  showMsg.set('');
};
showMsg.subscribe((value) => {
  message = value;
});
</script>

<div class="w-full left-0 fixed z-40 block">
  <Menu />
  {#if message}
    <div class="pt-12 w-full fixed">
      <Alert accent dismissable on:close={handleClose}>{message}</Alert>
    </div>
  {/if}
</div>
<div class="w-full px-4 pt-20 pb-5">
  <slot />
</div>
