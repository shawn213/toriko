<script lang="ts">
import { onMount } from 'svelte';
export let menuUrl = '';
let img;
let img_width;
let imgUrl = '';

function handleImageLoad() {
  img_width = img.width;
  console.log(img_width);
}
</script>

{#if menuUrl}
  <img src={menuUrl} on:load={handleImageLoad} bind:this={img} alt="" />
{/if}
{#if img_width}
  <a
    href={menuUrl}
    class="inline-flex items-center hover:underline text-primary-600 dark:text-primary-500"
    target="_blank">菜單連結</a>
{/if}
