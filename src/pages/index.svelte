<script lang="ts">
import { onMount } from 'svelte';
import Countdown from 'svelte-countdown/src';
import { Span, Heading } from 'flowbite-svelte';
import { holidays } from '../stores';
import { get } from 'svelte/store';
import moment from 'moment';
import SveltyPicker from 'svelty-picker';
import _ from 'lodash';

$: holiday = [];
$: isHoliday = false;
$: date = '';
let show = true;
$: if (date) {
  show = false;
  holiday[0] = {
    date,
    title: `距離指定的時間 ${_.split(date, ' ')[0]}`,
  };
  setTimeout(() => (show = true), 0);
}

onMount(() => {
  const now = moment();
  const weekDayToFind = now.clone().day('Friday').weekday(); //change to searched day name
  const nextFriday = now.clone(); //now or change to any date
  while (nextFriday.weekday() !== weekDayToFind) {
    nextFriday.add(1, 'day');
  }
  const hs = get(holidays);
  const nextHoliday_obj = hs.find(
    (h) => moment(h.date, 'YYYY-MM-DD').isAfter(now) && h.name !== '國定假日' && h.name !== '兒童節'
  );

  if (nextFriday.isBefore(moment(`${nextHoliday_obj.date}`, 'YYYY-MM-DD'))) {
    holiday.push({
      date: `${nextFriday.format('YYYY-MM-DD')} 18:20`,
      title: `距離下一個周末`,
    });
    date = `${nextFriday.format('YYYY-MM-DD')} 18:20`;
  }

  const nextHoliday = moment(`${nextHoliday_obj.date}`, 'YYYY-MM-DD');
  const prefHoliday = nextHoliday.clone().add(-1, 'day');
  while (
    prefHoliday.weekday() === 0 ||
    prefHoliday.weekday() === 6 ||
    hs.filter((h) => h.date === prefHoliday.format('YYYY-MM-DD')).length > 0
  ) {
    prefHoliday.add(-1, 'day');
  }

  holiday.push({
    date: `${prefHoliday.format('YYYY-MM-DD')} 18:20`,
    title: `距離下一個國定假日 ${nextHoliday_obj.name}`,
  });
  holiday = holiday;
});
</script>

<div class="block">
  {#if holiday.length > 0}
    <SveltyPicker
      inputClasses="block mb-4 disabled:cursor-not-allowed disabled:opacity-50 focus:border-blue-500 focus:ring-blue-500 dark:focus:border-blue-500 dark:focus:ring-blue-500 bg-gray-50 text-gray-900 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 border-gray-300 dark:border-gray-600 p-2.5 text-sm rounded-lg"
      format="yyyy-mm-dd hh:ii"
      bind:value={date}
      startDate={moment().format('YYYY-MM-DD')} />
    {#each holiday as h}
      {#if show}
        <Countdown from={`${h.date}`} dateFormat="YYYY-MM-DD H:m" zone="Asia/Taipei" let:remaining>
          <div class="block mb-4">
            <div class="dark:text-white text-xl">{h.title}</div>
            <div class="whatever">
              {#if remaining.done === false}
                {#if remaining.months > 0}
                  <Span class="text-xl">{remaining.months} 月</Span>
                {/if}
                {#if remaining.days > 0}
                  <Span class="text-xl">{remaining.days} 天</Span>
                {/if}
                <Span class="text-xl">{remaining.hours} 小時</Span>
                <Span class="text-xl">{remaining.minutes} 分</Span>
                <Span class="text-xl">{remaining.seconds} 秒</Span>
              {:else if isHoliday}
                <Heading tag="h2">The time has come!</Heading>
              {/if}
            </div>
          </div>
        </Countdown>
      {/if}
    {/each}
  {/if}
</div>
