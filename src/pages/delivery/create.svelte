<script lang="ts">
import * as yup from 'yup';
import axios from '../../utils/Api';
import { Form, Message } from 'svelte-yup';
import { FloatingLabelInput, Button, List, Li, Label, Range, Helper, Checkbox, Kbd, Radio } from 'flowbite-svelte';
import StarRating from '../../lib/Rating.svelte';
import { inns, showMsg, loading } from '../../stores/stores';
import * as Encoding from '../../utils/Encoding';
import moment from 'moment';
const checkboxStyle = [
  'font-normal',
  'p-1',
  'w-full',
  'text-gray-500',
  'bg-white',
  'rounded-lg',
  'border-2',
  'border-gray-200',
  'cursor-pointer',
  'dark:hover:text-gray-300',
  'dark:border-gray-700',
  'peer-checked:border-blue-600',
  'hover:text-gray-600',
  'dark:peer-checked:text-gray-300',
  'peer-checked:text-gray-600',
  'hover:bg-gray-50',
  'dark:text-gray-400',
  'dark:bg-gray-800',
  'dark:hover:bg-gray-700',
].join(' ');
const items = ['快樂肥宅餐', '快樂泉源', '麵', '飯'];
const types = [
  { value: 'Lunch', text: '午餐' },
  { value: 'Drink', text: '飲料' },
];

const platforms = {
  'Uber Eats': '吳柏毅',
  foodpanda: '復胖達',
  Nidin: '你訂',
};

let schema = yup.object().shape({
  storeName: yup.string().required('店名必填'),
  tags: yup.array().label('標籤'),
});
const fields = {
  storeName: '',
  nickName: '',
  delicious: 5,
  tags: [],
  type: 'Lunch',
  platform: 'Uber Eats',
  nickPlatform: '',
  url: '',
};
let submitted = false;
let isValid: boolean;
function formSubmit() {
  submitted = true;
  isValid = schema.isValidSync(fields);
  if (isValid) {
    loading.set(true);
    const token = Encoding.crypto(
      import.meta.env.VITE_API_SALT,
      `writeTempDeliver_${moment().format('YYYYMMDDHHmmss')}`
    );
    const payload = { ...fields, nickPlatform: platforms[fields.platform] };
    let urlParameters = Object.entries({ ...payload, token })
      .map((e) => e.join('='))
      .join('&');
    axios
      .get(import.meta.env.VITE_API_URL + `?${urlParameters}`)
      .then((res) => {
        if (res.data.result) {
          showMsg.set('新增成功');
          localStorage.removeItem('de');
          inns.update((s) => [...s, res.data.result]);
          isValid = false;
        }
      })
      .finally(() => {
        loading.set(false);
      });
  }
}
</script>

<div class="grid sm:grid-cols-1 gap-4">
  <div class="flex justify-center">
    <Form class="w-96 h-96" {schema} {fields} submitHandler={formSubmit} {submitted}>
      <List tag="ul" list="none" class="space-y-2 mb-2">
        <Li>
          <FloatingLabelInput bind:value={fields.storeName} label="店名" class="mb-2" />
          <Helper color="red"><Message name="storeName" /></Helper>
        </Li>
        <Li>
          <FloatingLabelInput bind:value={fields.nickName} label="暱稱" class="mb-2" />
        </Li>
        <Li>
          <Label>好吃程度</Label>
          <StarRating rating={fields.delicious} />
          <Range id="range-steps" min="0" max="5" bind:value={fields.delicious} step="0.5" />
        </Li>
        <Li>
          <Label class="mr-2">標籤</Label>
          <div class="flex flex-wrap">
            {#each items as item}
              <Checkbox custom bind:group={fields.tags} value={item} class="mr-2">
                <Kbd class={checkboxStyle}>
                  {item}
                </Kbd>
              </Checkbox>
            {/each}
          </div>
          <Helper color="red"><Message name="tags" /></Helper>
        </Li>
        <Li>
          <Label class="mr-2">類別</Label>
          <div class="flex flex-wrap">
            {#each types as item}
              <Radio custom bind:group={fields.type} value={item.value} class="mr-2">
                <Kbd class={checkboxStyle}>
                  {item.text}
                </Kbd>
              </Radio>
            {/each}
          </div>
          <Helper color="red"><Message name="type" /></Helper>
        </Li>
        <Li>
          <Label class="mr-2">平台</Label>
          <div class="flex flex-wrap">
            {#each Object.entries(platforms) as [key, value]}
              <Radio custom bind:group={fields.platform} value={key} class="mr-2">
                <Kbd class={checkboxStyle}>
                  {key}
                </Kbd>
              </Radio>
            {/each}
          </div>
          <Helper color="red"><Message name="platform" /></Helper>
        </Li>
        <Li>
          <FloatingLabelInput bind:value={fields.url} label="連結" class="mb-2" />
        </Li>
      </List>
      <Button type="submit" disabled={isValid} class="w-full my-1" outline color="purple">送出</Button>
    </Form>
  </div>
</div>
