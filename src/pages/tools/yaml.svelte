<script lang="ts">
  import { Label, Textarea, Button } from 'flowbite-svelte';
  import _ from 'lodash';
  import yaml from 'js-yaml';
  
  const rows: number = 16;
  let json = undefined;
  let yml = '';

  const flattenObject = (obj, parentKey = '', result = {}) => {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        const newKey = parentKey ? `${parentKey}.${key}` : key;
        if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
          flattenObject(obj[key], newKey, result);
        } else {
          result[newKey] = obj[key];
        }
      }
    }
    return JSON.stringify(result, null, '  ');
  }
  
  const handleChange = (flag) => {
    switch (flag) {
      case 'yaml':
        yml = yaml.dump(JSON.parse(json));
        break;
      default:
        json = flattenObject(yaml.load(yml));
        break;
    }
  };
  </script>
  
  <div class="grid items-center grid-cols-10 gap-4">
    <div class="mb-6 col-span-5">
      <Label for="content-input" class="block mb-2">json</Label>
      <Textarea
        id="content-input"
        placeholder={JSON.stringify({ key: 'value' })}
        bind:value={json}
        {rows}
        style="height: 500px;" />
      <div class="flex justify-between">
        <Button on:click={() => navigator.clipboard.writeText(json)}>copy</Button>
        <Button on:click={() => handleChange('yaml')}>to yaml</Button>
      </div>
    </div>
    <div class="mb-6 col-span-5">
      <Label for="default-input" class="block mb-2">yaml</Label>
      <Textarea
        id="content-input"
        placeholder={JSON.stringify({ key: 'test' })}
        bind:value={yml}
        {rows}
        style="height: 500px;" />
      <div class="flex justify-between">
        <Button on:click={() => handleChange('json')}>to json</Button>
        <Button on:click={() => navigator.clipboard.writeText(yml)}>copy</Button>
      </div>
    </div>
  </div>
  