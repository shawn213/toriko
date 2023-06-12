<script lang="ts">
import {
  Label,
  Textarea,
  Button,
  Toggle,
  Input,
} from 'flowbite-svelte';
import _ from 'lodash';
import Rabbit from 'crypto-js/rabbit';
import encUtf8 from 'crypto-js/enc-utf8';

const rows: number = 10
let toggle: boolean = false;
let content: string = '';
let target: string = '';
let key: string = '';

$: buttonText = toggle ? '解密' : '加密';
$: contentText = toggle ? '密文' : '需加密內容';
$: contentPlaceholder = toggle ? '例: U2FsdGVkX18cbHi2CxrSUnAEhwx+0g==' : '內容';

const handleClick = () => {
  if (toggle) {
    const decrypted = Rabbit.decrypt(content, key);
    target = decrypted.toString(encUtf8);
  } else {
    target = Rabbit.encrypt(content, key);
  }
};
</script>

<div class="flex gap-2 mb-2 h-8">
  <div class="dark:text-white whitespace-nowrap">加密</div>
  <Toggle bind:checked={toggle}/>
  <div class="dark:text-white whitespace-nowrap">解密</div>
</div>
<div class="grid items-center sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-4">
  <div class="mb-6">
    <Label for="content-input" class="block mb-2">{contentText}</Label>
    <Textarea id="content-input" placeholder={contentPlaceholder} bind:value={content} {rows} />
  </div>
  <div class="mb-6">
    <Label for="key-input" class="block mb-2">鑰匙</Label>
    <Input id="key-input" placeholder="Default input" bind:value={key} {rows} />
  </div>
  <div class="mb-6">
    <Label for="default-input" class="block mb-2">結果</Label>
    <Textarea id="default-input" placeholder="Default input" bind:value={target} {rows} />
  </div>
</div>
<div class="flex justify-center mb-2">
  <Button on:click={handleClick}>{buttonText}</Button>
</div>
  