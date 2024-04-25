<script lang="ts">
import { onMount, onDestroy } from 'svelte';
import { sineIn } from 'svelte/easing';
import {
  AccordionItem,
  Accordion,
  List,
  Li,
  Drawer,
  Span,
  Img,
  Button,
  Label,
  Input,
  Helper,
  P,
} from 'flowbite-svelte';
import { Icon } from 'flowbite-svelte-icons';
import * as _ from 'lodash';
import { params } from '@roxi/routify';
import OrderName from '../../lib/OrderName.svelte';
import axios from '../../utils/GoogleApi';
import { loading, showMsg, hideHeader } from '../../stores';
import db from '../../utils/Database';
import * as yup from 'yup';
import { Form, Message } from 'svelte-yup';

let hidden = true;
let total = 0;
let fullName = '';
let order = {
  menuUrl: '',
  orderOwner: '',
  status: '',
  storeName: '',
  items: [{ name: '', size: '', option: '', count: 1, price: 0 }],
};
let oriOrder = {
  menuUrl: '',
  orderName: '',
  status: '',
  storeName: '',
  items: { example: [{ name: '', size: '', option: '', count: 1, price: 0 }] },
};
let isOwner = false;

let orderItem = { items: [{ name: '', size: '', option: '', count: 1, price: 0 }] };
let schema = yup.object().shape({
  items: yup
    .array()
    .transform((field) => {
      if (field.length !== 1) {
        field = field.slice(0, -1);
      }
      return field;
    })
    .of(
      yup.object().shape({
        name: yup.string().required('品項名稱必填'),
        option: yup.string(),
        size: yup.string(),
        count: yup.number().min(1).required('數量必填'),
        price: yup.number().min(0).required('價格必填,如只是附加品項請填0'),
      }),
    ),
});

let submitted = false;

$: if (orderItem.items && orderItem.items.every((item) => item.name)) {
  orderItem.items.push({
    name: '',
    size: '',
    option: '',
    price: 0,
    count: 1,
  });
  submitted = false;
} else if (orderItem.items) {
  let size = orderItem.items.filter((item) => item.name === '');
  if (size.length > 1) {
    orderItem.items.pop();
  }
}

$: if (orderItem.items && orderItem.items.some((item) => item.price)) {
  total = _.sumBy(orderItem.items, (item) => Number(item.price) * Number(item.count));
}

const handleQuery = () => {
  const orderName = db.getOrderUserName();
  fullName = orderName.fullName;
  loading.update(() => true);
  setTimeout(() => {
    axios
      .post('getOrder', {
        sheetName: $params.hashCode,
      })
      .then((res) => {
        if (res.data.message === 'success') {
          let { result } = res.data;
          let items = [{ name: '', size: '', option: '', count: 1, price: 0 }];
          if (!_.isEmpty(result.items)) {
            oriOrder = _.cloneDeep(result);
            if (result.items[orderName.fullName]) {
              items = result.items[orderName.fullName];
            }
          }
          order = { ...result, items };
          orderItem.items = items;
        }
      })
      .finally(() => {
        loading.update(() => false);
      });
  }, 800);
};

const triggerDrawer = () => {
  hidden = !hidden;
  if (!hidden) {
    handleQuery();
  }
};

onMount(async () => {
  hideHeader.update(() => true);
  const orderName = db.getOrderUserName();
  fullName = orderName.fullName;
  isOwner = await db.isOrderOwner($params.hashCode);
  handleQuery();
});

const handleSubmit = () => {
  if (order.status === 'close') {
    showMsg.update(() => `此單已關閉，如有臨時加入的需求請洽詢團主 ${order.orderOwner}`);
    return;
  }
  submitted = true;
  let isValid = schema.isValidSync(orderItem);
  if (isValid) {
    const orderName = db.getOrderUserName();
    const { items: its } = orderItem;
    if (its.length > 0) {
      loading.update(() => true);
      axios
        .post('addOrder', {
          sheetName: $params.hashCode,
          name: orderName.fullName,
          items: its.filter((it) => it.name),
        })
        .then((res) => {
          if (res.data.message) {
            showMsg.set(res.data.message);
            submitted = false;
          }
        })
        .finally(() => {
          loading.update(() => false);
        });
    }
  }
};

const handleClose = () => {
  loading.update(() => true);
  axios
    .post('closeOrder', {
      sheetName: $params.hashCode,
    })
    .then((res) => {
      const { message } = res.data;
      if (message) {
        showMsg.set(message);
      }
    })
    .finally(() => {
      loading.update(() => false);
    });
};

const handleDelete = () => {
  loading.update(() => true);
  axios
    .post('deleteOrder', {
      sheetName: $params.hashCode,
    })
    .then((res) => {
      const { message } = res.data;
      if (message) {
        showMsg.set(message);
        db.removeOrder($params.hashCode);
      }
    })
    .finally(() => {
      loading.update(() => false);
    });
};

onDestroy(() => {
  hideHeader.update(() => false);
});
</script>

<OrderName />
<div class="grid sm:grid-cols-1 lg:grid-cols-2 gap-4">
  <div class="block">
    <a
      href={order.menuUrl}
      class="inline-flex items-center hover:underline text-primary-600 dark:text-primary-500"
      target="_blank">{order.storeName}</a>
    <P>
      團主: <Span decorationClass="decoration-blue-500 decoration-double">{order.orderOwner}</Span>
    </P>
    {#if order.menuUrl}
      <Img src={order.menuUrl} alt="Preview" />
    {/if}
  </div>
  <div>
    <div class="grid sm:grid-cols-1 lg:grid-cols-1 gap-4">
      <Form class="flex flex-col space-y-3" {schema} fields={orderItem} submitHandler={handleSubmit} {submitted}>
        <div class="block">
          <div class="grid sm:grid-cols-1 lg:grid-cols-4 gap-2 mb-4">
            <Button size="xs" on:click={handleSubmit}>送出</Button>
            <Span>總共: {total} 元</Span>
          </div>
          {#if isOwner}
            <div class="grid sm:grid-cols-1 lg:grid-cols-4 gap-2 mb-4">
              <Button size="xs" on:click={handleClose}>收單</Button>
              <Button size="xs" on:click={handleDelete}>結清</Button>
            </div>
          {/if}
          {#each orderItem.items as item, idx}
            <div class="grid sm:grid-cols-1 lg:grid-cols-5 gap-2 mb-4 pb-1 border border-sky-500 p-1">
              <Label class="space-y-2">
                <span>品項名稱</span>
                <Input bind:value={item.name} placeholder="珍珠奶茶" />
              </Label>
              <Label class="space-y-2">
                <span>選項</span>
                <Input bind:value={item.option} placeholder="多冰/糖正常" />
              </Label>
              <Label class="space-y-2">
                <span>Size</span>
                <Input bind:value={item.size} placeholder="ex:L or M or None" />
              </Label>
              <Label class="space-y-2">
                <span>數量</span>
                <Input type="number" bind:value={item.count} placeholder="1" />
              </Label>
              <Label class="space-y-2">
                <span>價錢</span>
                <Input type="number" bind:value={item.price} placeholder="1" />
              </Label>
              <div>
                <Helper color="red"><Message name={`items[${idx}].name`} /></Helper>
                <Helper color="red"><Message name={`items[${idx}].option`} /></Helper>
                <Helper color="red"><Message name={`items[${idx}].size`} /></Helper>
                <Helper color="red"><Message name={`items[${idx}].count`} /></Helper>
                <Helper color="red"><Message name={`items[${idx}].price`} /></Helper>
              </div>
            </div>
          {/each}
        </div>
      </Form>
    </div>
  </div>
  <Span class="fixed right-5 top-15"><Icon name="cart-outline" class="w-5 h-5" on:click={triggerDrawer} /></Span>
</div>
<Drawer
  placement="right"
  transitionType="fly"
  transitionParams={{
    x: 320,
    duration: 200,
    easing: sineIn,
  }}
  bind:hidden
  id="sidebar6">
  <p class="mb-6 text-sm text-gray-500 dark:text-gray-400">
    <Accordion flush>
      {#each Object.entries(oriOrder.items) as [name, o]}
        <AccordionItem>
          <span slot="header">{name.split('-')[0]}</span>
          <p class="mb-2 text-gray-500 dark:text-gray-400">
            <List tag="ul" list="none" class="max-w-md">
              {#each o as item}
                <Li class="pb-2">
                  <div class="flex items-center space-x-4 rtl:space-x-reverse">
                    <div class="flex-1 min-w-0">
                      <p class="text-sm font-medium text-gray-900 truncate dark:text-white">{item.name}</p>
                      <p class="text-sm text-gray-500 truncate dark:text-gray-400">{item.option}</p>
                    </div>
                    <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                      {item.price}
                    </div>
                  </div>
                </Li>
              {/each}
            </List>
          </p>
        </AccordionItem>
      {/each}
    </Accordion>
  </p>
</Drawer>
