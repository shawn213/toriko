<script lang="ts">
import { Label, Textarea, Button, Toggle, Input, Select } from 'flowbite-svelte';
import _ from 'lodash';
import Rabbit from 'crypto-js/rabbit';
import encUtf8 from 'crypto-js/enc-utf8';
import jwt_decode from 'jwt-decode';
import { Base64 } from 'js-base64';

const rows: number = 10;
const encrypts = [
  { value: 'default', name: 'default' },
  { value: 'base64', name: 'base64' },
  { value: 'jwt', name: 'jwt' },
  { value: 'sha1', name: 'sha1' },
];
let toggle: boolean = false;
let content: string = '';
let target: string = '';
let key: string = '';
let selected: string = 'default';

let buttonText: string = '解密';
let contentText = '密文';
let contentPlaceholder = '例: U2FsdGVkX18cbHi2CxrSUnAEhwx+0g==';
let disabled = false;
let keyShow = true;
let inputShow = true;
$: switch (selected) {
  case 'jwt':
    inputShow = true;
    toggle = true;
    disabled = true;
    keyShow = false;
    break;
  case 'sha1':
    inputShow = false;
    toggle = false;
    disabled = true;
    keyShow = false;
    break;
  case 'base64':
    inputShow = true;
    disabled = false;
    keyShow = false;
    break;
  default:
    inputShow = true;
    disabled = false;
    keyShow = true;
    break;
}
$: if (toggle) {
  buttonText = '解密';
  contentText = '密文';
  contentPlaceholder = '例: U2FsdGVkX18cbHi2CxrSUnAEhwx+0g==';
} else {
  buttonText = '加密';
  contentText = '需加密內容';
  contentPlaceholder = '內容';
}

const byteToHex = (byte) => {
  return ('0' + byte.toString(16)).slice(-2);
};

const generateId = (len = 40) => {
  var arr = new Uint8Array(len / 2);
  window.crypto.getRandomValues(arr);
  return Array.from(arr, byteToHex).join('');
};

const handleClick = () => {
  if (toggle) {
    switch (selected) {
      case 'base64':
        target = Base64.atob(content);
        break;
      case 'jwt':
        target = JSON.stringify(jwt_decode(content), null, '\t');
        break;
      case 'sha1':
        target = generateId();
        break;
      default:
        const decrypted = Rabbit.decrypt(content, key);
        target = decrypted.toString(encUtf8);
        break;
    }
  } else {
    switch (selected) {
      case 'base64':
        target = Base64.btoa(content);
        break;
      case 'jwt':
        target = JSON.stringify(jwt_decode(content), null, '\t');
        break;
      case 'sha1':
        target = generateId();
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
    <Toggle bind:checked={toggle} bind:disabled color={disabled ? 'gray' : 'green'} />
    <div class="dark:text-white whitespace-nowrap">解密</div>
  </div>
  <Select class="mt-2" items={encrypts} bind:value={selected} />
</div>
<div class="grid items-center sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-4">
  {#if inputShow}
    <div class="mb-6">
      <Label for="content-input" class="block mb-2">{contentText}</Label>
      <Textarea id="content-input" placeholder={contentPlaceholder} bind:value={content} {rows} />
    </div>
  {/if}
  {#if keyShow}
    <div class="mb-6">
      <Label for="key-input" class="block mb-2">鑰匙</Label>
      <Input
        id="key-input"
        placeholder="Default input"
        bind:value={key}
        {rows}
        disabled={!['default'].includes(selected)} />
    </div>
  {/if}
  <div class="mb-6">
    <Label for="default-input" class="block mb-2">結果</Label>
    <Textarea id="default-input" placeholder="Default input" bind:value={target} {rows} />
  </div>
</div>
<div class="flex justify-center mb-2">
  <Button on:click={handleClick}>{buttonText}</Button>
</div>
