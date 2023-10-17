<script lang="ts">
import { Label, Textarea, Button } from 'flowbite-svelte';
import _ from 'lodash';
import { JSONEditor } from 'svelte-jsoneditor';

const rows: number = 16;
let content = '';
let target = undefined;
const handleClick = () => {
  const myJSON = JSON.parse(content);
  target = {
    json: myJSON,
  };
};
</script>

<div class="grid items-center sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-4">
  <div class="mb-6">
    <Label for="content-input" class="block mb-2">minify</Label>
    <Textarea id="content-input" placeholder={JSON.stringify({ key: 'test' })} bind:value={content} {rows} />
  </div>
  <div class="mb-6">
    <Label for="default-input" class="block mb-2">格式化後</Label>
    <p class="dark:text-white"><JSONEditor bind:content={target} /></p>
  </div>
</div>
<div class="flex justify-center mb-2">
  <Button on:click={handleClick}>格式化</Button>
</div>
