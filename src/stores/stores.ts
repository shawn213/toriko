import { writable } from "svelte/store";
import moment from "moment";
import Api from '../utils/Api';

export const inns = writable([]);
export const storeId = writable(0);
export const progress = writable(0);
export const showMsg = writable('');
const date = moment().format('DD');
let stores = JSON.parse(localStorage.getItem('stores'));
if (!stores || stores.date !== date) {
	const res = await Api.get(`${import.meta.env.VITE_API_URL}?method=findAllStore`);
	const { message, data } = res.data;
	if (!message) {
		stores = { stores: data, date };
		localStorage.setItem('stores', JSON.stringify(stores));
	}
}
inns.set(stores.stores);