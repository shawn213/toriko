import { writable } from "svelte/store";
import moment from "moment";
import Api from '../utils/Api';
import * as Encoding from '../utils/Encoding';

export const inns = writable([]);
export const tempIdx = writable([]);
export const storeId = writable(0);
export const progress = writable(0);
export const showMsg = writable('');
export const holidays = writable([]);
export const loading = writable(false);

const salt = import.meta.env.VITE_API_SALT;
const now = moment().format('YYYYMMDD');
const date = moment().isAfter(moment('12', 'HH')) ? `${now}PM` : `${now}AM`;
let stores = JSON.parse(localStorage.getItem('stores'));
if (!stores || stores.date !== date) {
  const token = Encoding.crypto(salt, `findAllStore_${moment().format('YYYYMMDDHHmmss')}`);
	const res = await Api.get(`${import.meta.env.VITE_API_URL}?token=${token}`);
	const { message, data } = res.data;
	if (!message) {
		stores = { stores: data, date };
		localStorage.setItem('stores', JSON.stringify(stores));
	}
}
let hs = JSON.parse(localStorage.getItem('holiday'));
if (!hs || hs.date !== moment().format('YYYYMM')) {
  const token = Encoding.crypto(salt, `findAllHoliday_${moment().format('YYYYMMDDHHmmss')}`);
  const res = await Api.get(`${import.meta.env.VITE_API_URL}?token=${token}`);
  const { data } = res;
  if (data.result.length > 0) {
    hs = { days: data.result, date: moment().format('YYYYMM') }
    localStorage.setItem('holiday', JSON.stringify(hs));
  }
}
holidays.set(hs.days);
inns.set(stores.stores);