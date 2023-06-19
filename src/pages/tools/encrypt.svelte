<script lang="ts">
import {
  Label,
  Textarea,
  Button,
  Toggle,
  Input,
  Select
} from 'flowbite-svelte';
import _ from 'lodash';
import Rabbit from 'crypto-js/rabbit';
import encUtf8 from 'crypto-js/enc-utf8';

const rows: number = 10;
const encrypts = [
  {value:"default", name: "default"},
  {value:"base64", name: "base64"},
];
let toggle: boolean = false;
let content: string = '';
let target: string = '';
let key: string = '';
let selected: string = 'default';

let buttonText: string = '解密';
let contentText = '密文';
let contentPlaceholder = '例: U2FsdGVkX18cbHi2CxrSUnAEhwx+0g==';
$: if (toggle) {
  buttonText = '解密';
  contentText = '密文';
  contentPlaceholder = '例: U2FsdGVkX18cbHi2CxrSUnAEhwx+0g==';
} else {
  buttonText = '加密';
  contentText = '需加密內容';
  contentPlaceholder = '內容';
}

const handleClick = () => {
  if (toggle) {
    switch (selected) {
      case 'base64':
        target = window.atob(content);
        break;
      default:
        const decrypted = Rabbit.decrypt(content, key);
        target = decrypted.toString(encUtf8);
        break;
    }
  } else {
    switch (selected) {
      case 'base64':
        target = window.btoa(content);
        break;
      default:
        target = Rabbit.encrypt(content, key);
        break;
    }
  }
};
</script>

<div class="grid items-center sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-10 2xl:grid-cols-10 gap-4">
  <div class="flex">
    <div class="dark:text-white whitespace-nowrap mr-2">加密</div>
    <Toggle bind:checked={toggle}/>
    <div class="dark:text-white whitespace-nowrap">解密</div>
  </div>
  <Select class="mt-2" items={encrypts} bind:value={selected} />
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
  