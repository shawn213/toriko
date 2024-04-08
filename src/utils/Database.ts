import Encoding from "./Encoding";
import { set, get, getMany, update, createStore } from 'idb-keyval';
import * as _ from 'lodash';

const CustomIDB = createStore('Toriko', 'GoodStore');

const getOrderUserName = () => {
  let orderUserName = localStorage.getItem('orderUserName');
  if (!orderUserName) {
    orderUserName = sessionStorage.getItem('orderUserName');
  }
  if (orderUserName) {
    const fullName = Encoding.decrypt(import.meta.env.VITE_API_SALT, orderUserName);
    const words = fullName.split('-');
    if (words.length > 1) {
      const [ name, uuid ] = words;
      return {
        name,
        uuid,
        fullName
      }
    }
  }
  return {
    name: 'anonymous',
    uuid: 'anonymous',
    fullName: 'anonymous'
  }
};

const addOwnerOrder = (storeName, uuid) => {
  update('ownerOrders', (val) => [ ...(val || []), { uuid, storeName } ], CustomIDB);
}

const isOrderOwner = async (uuid) => {
  const orders = await get('ownerOrders', CustomIDB);
  return _.some(orders, ['uuid', uuid]);
}

const removeOrder = (uuid) => {
  // @ts-ignore
  update('ownerOrders', (val) => _.remove(val, (item) => item.uuid !== uuid), CustomIDB);
}

export default {getOrderUserName, addOwnerOrder, isOrderOwner, removeOrder};