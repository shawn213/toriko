<script>
import { Input, Label } from 'flowbite-svelte';

let now = 0;
let next = 0;
let result = '';
$: if (now && next) {
  result = `${Math.round((1 - now / next) * 100 * 10) / 10}%`;
}
</script>

<div class="grid gap-6 mb-4 md:grid-cols-6 items-center">
  <div>
    <Label for="first_name" class="mb-2">調價前</Label>
    <Input type="text" bind:value={now} />
  </div>
  <div>
    <Label for="last_name" class="mb-2">調價後</Label>
    <Input type="text" bind:value={next} />
  </div>
</div>
<Label>{result}</Label>
