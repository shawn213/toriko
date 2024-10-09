<script lang="ts">
import { Label, Textarea, Button } from 'flowbite-svelte';
import _ from 'lodash';
import { format } from 'sql-formatter';

const rows: number = 16;
let minify = '';
let target = '';
const handleClick = () => {
  target = format(minify, {
    language: 'postgresql',
    tabWidth: 2,
    keywordCase: 'upper',
    linesBetweenQueries: 3,
    logicalOperatorNewline: 'before',
    expressionWidth: 80,
    indentStyle: 'tabularLeft'
  });
};

const handleChange = (flag) => {};
</script>

<div class="grid items-center grid-cols-11 gap-4">
  <div class="mb-6 col-span-5">
    <Label for="content-input" class="block mb-2">格式化前</Label>
    <Textarea id="content-input" placeholder="select * from test" bind:value={minify} {rows} style="height: 500px;" />
  </div>
  <div class="item-center justify-center flex">
    <div class="block">
      <div class="mb-2">
        <Button on:click={handleClick}>格式化</Button>
      </div>
    </div>
  </div>
  <div class="mb-6 col-span-5">
    <Label for="default-input" class="block mb-2">格式化後</Label>
    <Textarea id="content-input" placeholder="select * from test" bind:value={target} {rows} style="height: 500px;" />
  </div>
</div>
