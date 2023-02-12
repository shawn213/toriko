<script lang="ts">
import * as yup from 'yup';
import axios from '../../utils/Api';
import { Form, Message } from 'svelte-yup';
import {
  FloatingLabelInput,
  Button,
  List,
  Li,
  Label,
  Range,
  Helper,
  Checkbox,
  Kbd,
  Img,
  Span,
  A,
} from 'flowbite-svelte';
import StarRating from '../../lib/Rating.svelte';
import Map from '../../lib/Map.svelte';
import { inns, showMsg } from '../../stores/stores';
import * as Encoding from '../../utils/Encoding';
import moment from 'moment';
let lat = 22.611624148667726;
let lng = 120.29340837137883;
let checkPoint = 'no';
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
const items = ['冷氣', '無限暢飲'];
let show = true;
$: if (fields.coordinate && fields.coordinate.match(/22\.61\d{3,}, 120\.29\d{3,}/)) {
  handleRefresh();
}
const handleRefresh = () => {
  show = false;
  const [latitude, longitude] = fields.coordinate.split(/,/g);
  lat = parseFloat(latitude.trim());
  lng = parseFloat(longitude.trim());
  setTimeout(() => (show = true), 0);
};

let schema = yup.object().shape({
  storeName: yup.string().required('店名必填'),
  tags: yup.array().label('標籤'),
  coordinate: yup
    .string()
    .required('經緯度必填')
    .matches(/^(22\.61\d{3,}, 120\.29\d{3,})$/, '格式不符或超出範圍(恕本系統不提供服務你家)'),
});
const fields = { storeName: '', nickName: '', speed: 5, delicious: 5, tags: [], coordinate: '' };
let submitted = false;
let isValid;
function formSubmit() {
  submitted = true;
  isValid = schema.isValidSync(fields);
  if (isValid) {
    const token = Encoding.crypto(import.meta.env.VITE_API_SALT, `writeTempStore_${moment().format('YYYYMMDDHHmmss')}`);
    let urlParameters = Object.entries({ ...fields, token })
      .map((e) => e.join('='))
      .join('&');
    axios.get(import.meta.env.VITE_API_URL + `?${urlParameters}`).then((res) => {
      if (res.data.result) {
        showMsg.set('新增成功 - 新增的資料需審查僅自己看得到');
        localStorage.removeItem('stores');
        inns.update((s) => [...s, res.data.result]);
        isValid = false;
      }
    });
  }
}
</script>

<div class="grid sm:grid-cols-1 lg:grid-cols-2 gap-4">
  <div class="block w-96">
    <List tag="ul" list="decimal" class="space-y-1 mb-2 w-96">
      <Li>
        <Span class="mr-1">在 Mac 或 Windows 電腦上開啟</Span>
        <a
          href="https://www.google.com/maps/@22.6132182,120.2939619,18z"
          target="_block"
          class="inline-flex items-center font-medium hover:underline dark:text-blue-400">
          Google地圖網頁版
        </a>
        <Span>。</Span>
      </Li>
      <Li><Span>在地圖上針對某地點或地標按一下滑鼠右鍵。</Span></Li>
      <Li><Span>點選第一個「經緯度」選項即可複製該地點的座標。</Span></Li>
    </List>
    <Img src="https://i.imgur.com/YjYwY1I.png" alt="sample 1" size="w-96" class="rounded-lg p-0" />
  </div>
  <div class="flex">
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
          <Label>出餐速度</Label>
          <StarRating rating={fields.speed} />
          <Range id="range-steps" min="0" max="5" bind:value={fields.speed} step="0.5" />
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
          <FloatingLabelInput bind:value={fields.coordinate} label="座標" class="mb-2" />
          <Helper color="red"><Message name="coordinate" /></Helper>
        </Li>
      </List>
      {#if show}
        <Map {lat} {lng} />
      {/if}
      <Button type="submit" disabled={isValid} class="w-full my-1" outline color="purple">送出</Button>
    </Form>
  </div>
</div>
