import { writable } from "svelte/store";
import moment from "moment";
import axios from "axios";

export const inns = writable([]);
export const storeId = writable(0);
export const showMsg = writable('');
const date = moment().format('DD');
let stores = JSON.parse(localStorage.getItem('stores'));
if (!stores || stores.date !== date) {
	const res = await axios.get(`${import.meta.env.VITE_API_URL}?method=findAllStore`);
	const { message, data } = res.data;
	if (!message) {
		stores = { stores: data, date };
		localStorage.setItem('stores', JSON.stringify(stores));
	}
}
inns.set(stores.stores);