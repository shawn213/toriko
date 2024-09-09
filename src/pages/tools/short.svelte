<script lang="ts">
  import { v4 } from 'uuid';
  import { Input, Span, Label, Button } from 'flowbite-svelte';
  import { getShortUUID } from '../../utils/String'

  let str = ''
  let result = ''
  $: if (str.length === 36) {
    result = getShortUUID(str)
  }
</script>

<div class="block">
  <div class="mb-4">
    <div class="flex items-center mb-1">
      <Label class="mr-2">欲產生短 uuid 字串</Label>
      <Button on:click={() => str = v4()}>產生 v4 uuid</Button>
    </div>
    <Input bind:value={str} />
  </div>
  <div class="mb-4">
    <Label class="mb-1">結果</Label>
    <Span>{result}</Span>
  </div>
  {#if result}
    <div class="mb-4">
      <Label class="mb-1">不用知道這是什麼</Label>
      <Span>/v/{result}/p/{str}</Span>
    </div>
  {/if}
</div>