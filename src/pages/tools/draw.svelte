<script lang="ts">
import {
  Label,
  Textarea,
  Table,
  TableHead,
  TableHeadCell,
  TableBody,
  TableBodyCell,
  Button,
  TableBodyRow,
} from 'flowbite-svelte';
import _ from 'lodash';
import Slot from '../../lib/Slot.svelte';
const rows = 10;
let source: string;
let target: string;
let ss: string = '';
let tt: string = '';
let tPlay = true;
let sList: any[] = [];
let tList: any[] = [];
let result = [];
let second: number = 5;
$: total = second * 1000;
$: base = Math.floor(total / 5);
$: wait = base * 4;
$: stopWait = Math.floor(base / 2);

$: if (source) {
  const s = _.split(source, '\n').filter((str) => _.trim(str).length > 0);
  // 亂數排序
  s.sort(() => Math.random() - 0.5);
  sList = s;
  tPlay = true;
  result = [];
}

$: if (target) {
  const t = _.split(target, '\n').filter((str) => _.trim(str).length > 0);
  // 亂數排序
  t.sort(() => Math.random() - 0.5);
  tList = t;
  tPlay = true;
  result = [];
}

const forEachWithDelay = (array, callback, delay) => {
  let i = 0;
  if (array.length > 0) {
    let interval = setInterval(() => {
      callback(array[i], i, array);
      if (++i >= array.length) clearInterval(interval);
    }, delay);
  }
};

const addResult = () => {
  console.log(stopWait);
  setTimeout(() => {
    tPlay = false;
    setTimeout(() => {
      result[result.length] = {
        title: ss,
        name: tt,
      };
    }, stopWait);
  }, wait);
};

const handleClick = () => {
  ss = sList.splice(0, 1)[0];
  addResult();
  forEachWithDelay(
    sList,
    (item) => {
      tPlay = true;
      ss = item;
      addResult();
    },
    total
  );
};
</script>

<div class="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2 gap-4">
  <div class="mb-6">
    <Label for="default-input" class="block mb-2">來源</Label>
    <Textarea id="default-input" placeholder="Default input" bind:value={source} {rows} />
  </div>
  <div class="mb-6">
    <Label for="default-input" class="block mb-2">目標</Label>
    <Textarea id="default-input" placeholder="Default input" bind:value={target} {rows} />
  </div>
</div>
<div class="block">
  <div class="flex justify-center mb-3 dark:text-white text-5xl">{ss}</div>
  <div class="flex justify-center mb-2 gap-1">
    <Slot array={tList} bind:play={tPlay} bind:value={tt} />
  </div>
</div>
<div class="flex justify-center mb-2">
  <Button on:click={handleClick}>配對</Button>
</div>
<div class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-1">
  {#each result as item}
    <div>
      <Table color="green" hoverable={true}>
        <TableHead><TableHeadCell class="text-center text-2xl">{item.title}</TableHeadCell></TableHead>
        <TableBody class="divide-y">
          <TableBodyRow>
            <TableBodyCell class="text-center text-2xl">{item.name}</TableBodyCell>
          </TableBodyRow>
        </TableBody>
      </Table>
    </div>
  {/each}
</div>
