<script lang="ts">
import { Label, Textarea, Button } from 'flowbite-svelte';
import _ from 'lodash';
import { JSONEditor } from 'svelte-jsoneditor';

const rows: number = 16;
let minify = '';
let target = undefined;
const handleClick = () => {
  target = {
    text: minify,
    json: JSON.parse(minify),
  };
};

const handleChange = (flag) => {
  switch (flag) {
    case 'minify':
      minify = JSON.stringify(target.json, null, 0);
      break;
    default:
      minify = JSON.stringify(target.json, null, '\t');
      break;
  }
};
</script>

<div class="grid items-center grid-cols-10 gap-1">
  <div class="mb-6 col-span-5">
    <Label for="content-input" class="block mb-2">minify</Label>
    <Textarea
      id="content-input"
      placeholder={JSON.stringify({ key: 'test' })}
      bind:value={minify}
      {rows}
      style="height: 500px;" />
    <div class="flex justify-center">
      <Button on:click={() => navigator.clipboard.writeText(minify)}>copy</Button>
      <Button on:click={() => handleClick()} class="mr-1">{'>'}</Button>
    </div>
  </div>
  <div class="mb-6 col-span-5">
    <Label for="default-input" class="block mb-2">格式化後</Label>
    <p class="dark:text-white" style="height: 500px;">
      <JSONEditor bind:content={target} mainMenuBar={false} navigationBar={false} />
    </p>
    <div class="flex justify-center mt-2">
      <Button on:click={() => handleChange('')} class="mr-1">{'<'}</Button>
      <Button on:click={() => handleChange('minify')}>minify</Button>
    </div>
  </div>
</div>
