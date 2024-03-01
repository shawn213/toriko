<script>
import { Input, Label } from 'flowbite-svelte';

let now = 0;
let next = 0;
let magn = 0;
let mag = 0;
let result = 0;
let month = 0;
let bonus = 0;
$: if (now && next) {
  mag = Math.round(((next - now) / now) * 100 * 10) / 10;
}
$: if (now && magn) {
  result = Number(now) + now * (magn / 100);
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
