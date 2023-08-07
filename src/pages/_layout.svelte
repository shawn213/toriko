<script lang="ts">
import { Alert, Span } from 'flowbite-svelte';
import { showMsg, loading } from '../stores';
import Menu from '../lib/Menu.svelte';
import Loading from '../lib/Loading.svelte';

let message = undefined;
const handleClose = () => {
  showMsg.set('');
};
showMsg.subscribe((value) => {
  message = value;
});
let isLoading = true;
loading.subscribe((value) => {
  isLoading = value;
});
</script>

{#if isLoading}
  <Loading />
{/if}
<div class="w-full left-0 fixed z-40 block">
  <Menu />
  {#if message}
    <div class="w-full fixed mt-2">
      <Alert dismissable on:close={handleClose}>{message}</Alert>
    </div>
  {/if}
</div>
<div class="w-full px-4 pt-20 pb-5">
  <slot />
</div>
<Span class="fixed right-5 bottom-0">{import.meta.env.VITE_VERSION}</Span>
