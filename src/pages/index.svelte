<script lang="ts">
import { onMount } from 'svelte';
import Countdown from 'svelte-countdown/src';
import { Span } from 'flowbite-svelte';
import { holidays } from '../stores/stores';
import { get } from 'svelte/store';
import moment from 'moment';
$: holiday = [];

onMount(() => {
  const now = moment();
  const weekDayToFind = now.clone().day('Friday').weekday(); //change to searched day name
  const nextFriday = now.clone(); //now or change to any date
  while (nextFriday.weekday() !== weekDayToFind) {
    nextFriday.add(1, 'day');
  }
  const hs = get(holidays);
  let nextHoliday_str = hs.find((h) => moment(h, 'YYYY-MM-DD').isAfter(now));

  if (nextFriday.isBefore(moment(`${nextHoliday_str}`, 'YYYY-MM-DD'))) {
    holiday.push({
      date: nextFriday.format('YYYY-MM-DD'),
      title: `距離下一個周末`,
    });
  }

  const nextHoliday = moment(`${nextHoliday_str}`, 'YYYY-MM-DD');
  const prefHoliday = nextHoliday.clone().add(-1, 'day');
  while (prefHoliday.weekday() === 0 || prefHoliday.weekday() === 6) {
    prefHoliday.add(-1, 'day');
  }

  holiday.push({
    date: prefHoliday.format('YYYY-MM-DD'),
    title: `距離下一個國定假日 ${nextHoliday.format('YYYY-MM-DD')}`,
  });
  holiday = holiday;
});
</script>

<div class="block">
  {#if holiday.length > 0}
    {#each holiday as h}
      <Countdown from={`${h.date} 18:20:00`} dateFormat="YYYY-MM-DD H:m:s" zone="Asia/Taipei" let:remaining>
        <div class="block">
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
            {:else}
              <h2>The time has come!</h2>
            {/if}
          </div>
        </div>
      </Countdown>
    {/each}
  {/if}
</div>
