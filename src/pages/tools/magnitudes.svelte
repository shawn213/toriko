<script lang="ts">
import { Input, Label } from 'flowbite-svelte';

let now:number = 0;
let next:number = 0;
let magn:number = 0;
let meal:number = 0;
let mag:number = 0;
let result:number = 0;
let month:number = 1;
let bonus:number = 0;
$: if (now && next) {
  mag = Math.round(((next - now) / now) * 100 * 10) / 10;
}
$: if (now && magn) {
  result = Number(now) + now * (magn / 100);
}
$: if (meal) {
  result = (now * 4) + ((now - meal * 2) * 2) + (next * 8);
}
</script>

<div class="grid gap-6 mb-4 grid-cols-4 items-center">
  <div>
    <Label for="first_name" class="mb-2">調價前</Label>
    <Input type="text" class="text-right" bind:value={now} />
  </div>
  <div>
    <Label for="last_name" class="mb-2">調價後</Label>
    <Input type="text" class="text-right" bind:value={next} />
  </div>
  <div>
    <Label for="last_name" class="mb-2">結果(%)</Label>
    <Input type="text" class="text-right" bind:value={mag} />
  </div>
</div>
<div class="grid gap-6 mb-4 md:grid-cols-4 items-center">
  <div class="grid gap-6 mb-4 grid-cols-4 items-center">
    {#if now && next}
      <div>
        <Label for="last_name" class="mb-2">meal</Label>
        <Input type="text" class="text-right" bind:value={meal} />
      </div>
    {/if}
    <div>
      <Label for="last_name" class="mb-2">調幅(%)</Label>
      <Input type="text" class="text-right" bind:value={magn} />
    </div>
  </div>
</div>
<div class="grid gap-6 mb-4 grid-cols-4 items-center">
  <div>
    <Label for="last_name" class="mb-2">調價後</Label>
    <Input type="text" class="text-right" bind:value={result} />
  </div>
  <div>
    <Label for="last_name" class="mb-2">基數</Label>
    <Input type="text" class="text-right" bind:value={month} />
  </div>
  <div>
    <Label for="last_name" class="mb-2">bonus</Label>
    <Input type="text" class="text-right" bind:value={bonus} />
  </div>
  <div>
    <Label for="last_name" class="mb-2">結果</Label>
    <Label>{result * month + Number(bonus)}</Label>
  </div>
</div>
