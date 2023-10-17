<script lang="ts">
import { Label, Input, Textarea, Button, Toggle } from 'flowbite-svelte';
import _ from 'lodash';
let javaToggle = false;
let tableName = '';
let column = '';
let primaryKey = '';
let result = '';
const handleClick = () => {
  const columns = column.split(/\s?,\s?/);
  const primaryKeys = primaryKey.split(/\s?\.\s?/);
  result = `
insert into ${tableName} (
  ${columns.join(', ')}
)
values
<foreach collection='list' item='vo' index='index' separator=','>
  (
    ${[...primaryKeys, ...columns].map((key) => `#{vo.${key}}`).join(', ')}
  )
</foreach>
on conflict(${primaryKeys.join(', ')})
do update set
${columns.map((key) => `${key} = EXCLUDED.${key}`).join(',\n')}
  `;
  result = result
    .split('\n')
    .map((line) => _.trim(line))
    .filter((line) => line)
    .join('\n');
  if (javaToggle) {
    result = result
      .split('\n')
      .map((line) => _.trim(line))
      .filter((line) => line)
      .map((line) => `" ${line} " `)
      .join('+\n');
  }
};
</script>

<div class="flex">
  <div class="dark:text-white whitespace-nowrap mr-2">java 17</div>
  <Toggle bind:checked={javaToggle} />
  <div class="dark:text-white whitespace-nowrap">java 8</div>
</div>
<div class="grid items-center sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-4">
  <div class="mb-3">
    <Label class="block mb-2">table name</Label>
    <Input bind:value={tableName} />
  </div>
</div>
<div class="grid items-center sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2 gap-4">
  <div class="mb-4">
    <Label class="block mb-2">column</Label>
    <Textarea rows="5" bind:value={column} />
  </div>
</div>
<div class="grid items-center sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-4">
  <div class="mb-3">
    <Label class="block mb-2">primary key</Label>
    <Input bind:value={primaryKey} />
  </div>
</div>
<div class="grid items-center grid-cols-2 gap-4">
  <div class="mb-3">
    <Label class="block mb-2">result</Label>
    <Textarea bind:value={result} rows="10" readonly />
  </div>
</div>
<Button on:click={handleClick}>轉換</Button>
