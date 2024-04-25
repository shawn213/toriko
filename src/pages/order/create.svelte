<script lang="ts">
import * as yup from 'yup';
import { Heading, Button, FloatingLabelInput, Helper, Label, Input } from 'flowbite-svelte';
import { Form, Message } from 'svelte-yup';
import OrderName from '../../lib/OrderName.svelte';
import axios from '../../utils/GoogleApi';
import { loading, showMsg } from '../../stores';
import db from '../../utils/Database';
import { goto } from '@roxi/routify';

let submitted = false;
let img;
let img_width;
let fields = {
  menuUrl: '',
  storeName: '',
};
let schema = yup.object().shape({
  menuUrl: yup.string().required('菜單圖片連結必填'),
  storeName: yup.string().required('店名必填'),
});
let isValid = true;
const handleSubmit = () => {
  submitted = true;
  isValid = schema.isValidSync(fields);
  console.log(img_width);
  if (img_width && isValid) {
    let orderUserName = db.getOrderUserName();
    const data = {
      storeInfo: {
        storeName: fields.storeName,
        orderOwner: orderUserName.name,
        url: fields.menuUrl,
      },
    };
    loading.update(() => true);
    axios.post('createOrder', data).then(async (res) => {
      if (res.data.message) {
        console.log(res.data);
        const { result } = res.data;
        await db.addOwnerOrder(fields.storeName, result);
        $goto('/order/:hashCode', { hashCode: result });
        loading.update(() => false);
      }
    });
  }
};

function handleImageLoad() {
  img_width = img.width;
}
</script>

<Form {fields} {schema} {submitted} submitHandler={handleSubmit}>
  <div class="flex flex-col space-y-1 mb-2">
    <div class="block">
      <div>
        <Label class="space-y-1">
          <span>開團名</span>
          <Input bind:value={fields.storeName} placeholder="斷氣式笑法是哪招" />
          <Helper color="red"><Message name="storeName" /></Helper>
        </Label>
      </div>
    </div>
    <Label class="space-y-1">
      <span>菜單圖片連結</span>
      <Input bind:value={fields.menuUrl} placeholder="https://imgur.com/8964" />
      <Helper color="red"><Message name="menuUrl" /></Helper>
    </Label>
    <div class="mb-2">
      <img src={fields.menuUrl} on:load={handleImageLoad} bind:this={img} alt="" />
    </div>
  </div>
  <Button type="submit">送出</Button>
</Form>
<OrderName />
