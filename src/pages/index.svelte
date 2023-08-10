<script lang="ts">
import { onMount } from 'svelte';
// @ts-ignore
import Countdown from '$lib/countdown';
import { Span } from 'flowbite-svelte';
import { holidays } from '../stores';
import _ from 'lodash';
import dayjs from 'dayjs';

$: holiday = [];

onMount(() => {
  const now = dayjs();
  const nextFriday = now.clone().day(5).hour(18).minute(20).second(0);
  holidays.subscribe((hs) => {
    if (hs.length === 0) {
      return;
    }
    holiday = [];
    const nextHoliday_obj = hs.find((h) => dayjs(h.date, 'YYYY-MM-DD').isAfter(now));
    const prefHoliday = dayjs(nextHoliday_obj.date, 'YYYY-MM-DD');
    const nextHoliday = prefHoliday.clone().add(-1, 'day');
    while (
      nextHoliday.day() === 0 ||
      nextHoliday.day() === 6 ||
      hs.filter((h) => h.date === nextHoliday.format('YYYY-MM-DD')).length > 0
    ) {
      nextHoliday.add(-1, 'day');
    }
    if (nextFriday.isBefore(nextHoliday)) {
      holiday.push({
        date: nextFriday,
        name: '距離周末約',
      });
    }
    holiday.push({
      date: nextHoliday,
      name: `距離下一個國定假日 ${nextHoliday_obj.name}`,
    });
    holiday = holiday;
  });
});
</script>

{#if holiday.length > 0}
  {#each holiday as h}
    <div class="block mb-5">
      <Span class="text-xl">{h.name}</Span>
      <Countdown endTime={h.date} color="text-lime-400" textSize="text-4xl md:text-8xl" />
    </div>
  {/each}
{/if}
