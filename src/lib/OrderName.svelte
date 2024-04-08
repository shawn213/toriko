<script lang="ts">
import * as yup from 'yup';
import { onMount } from 'svelte';
import { Modal, Helper, Button, Checkbox, Label, Input } from 'flowbite-svelte';
import { Form, Message } from 'svelte-yup';
import * as Encoding from '../utils/Encoding';
import { generateShortId } from '../utils/String';

let popupModal = false;
let isValid = true;
let submitted = false;
const fields = {
  username: '',
  isSave: false,
};
let schema = yup.object().shape({
  username: yup.string().required('名稱必填'),
});

onMount(() => {
  let orderUserName = localStorage.getItem('orderUserName');
  if (orderUserName == null) {
    orderUserName = sessionStorage.getItem('orderUserName');
  }
  if (!orderUserName) {
    popupModal = true;
  }
});

const handleUser = () => {
  submitted = true;
  isValid = schema.isValidSync(fields);
  if (isValid) {
    const uuid = generateShortId();
    const name = fields.username + '-' + uuid;
    const orderUserName = Encoding.crypto(import.meta.env.VITE_API_SALT, name);
    if (fields.isSave) {
      localStorage.setItem('orderUserName', orderUserName);
    } else {
      sessionStorage.setItem('orderUserName', orderUserName);
    }
    popupModal = false;
  }
};
</script>

<Modal bind:open={popupModal} size="xs" dismissable={false}>
  <Form class="flex flex-col space-y-3" {schema} {fields} submitHandler={handleUser} {submitted}>
    <!-- <Label class="space-y-2">
      <span>部門</span>
      <Input bind:value={dept} placeholder="斷氣式笑法是哪招" required />
    </Label> -->
    <Label class="space-y-2">
      <span>貴姓大名</span>
      <Input bind:value={fields.username} placeholder="斷氣式笑法是哪招" />
      <Helper color="red"><Message name="username" /></Helper>
    </Label>
    <div class="flex items-start">
      <Checkbox bind:checked={fields.isSave}>紀錄</Checkbox>
    </div>
    <Button class="w-full1" type="submit">確定</Button>
  </Form>
</Modal>
