import axios from "axios";
import dayjs from "dayjs";
import { holidays, restaurants } from '../stores';
import { crypto } from './Encoding';

export const updateHoliday = async () => {
  const salt = import.meta.env.VITE_API_SALT;
  let hs = JSON.parse(localStorage.getItem('holidays'));
  const token = crypto(salt, `findAllHoliday_${dayjs().format('YYYYMMDDHHmmss')}`);
  const res = await axios.get(`${import.meta.env.VITE_API_URL}?token=${token}`);
  const { data } = res;
  if (data.result.length > 0) {
    hs = { days: data.result, date: dayjs().format('YYYYMM') }
    localStorage.setItem('holidays', JSON.stringify(hs));
  }
  holidays.set(hs.days);
}

export const updateStore = async () => {
  const salt = import.meta.env.VITE_API_SALT;
  const now = dayjs().format('YYYYMMDD');
  const date = dayjs().isAfter(dayjs('12', 'HH')) ? `${now}PM` : `${now}AM`;
  let stores = JSON.parse(localStorage.getItem('stores'));
  const token = crypto(salt, `findAllStore_${dayjs().format('YYYYMMDDHHmmss')}`);
  const res = await axios.get(`${import.meta.env.VITE_API_URL}?token=${token}`);
  const { result } = res.data;
  if (result.length > 0) {
    stores = { stores: result, date };
    localStorage.setItem('stores', JSON.stringify(stores));
  }
  restaurants.set(stores.stores);
}