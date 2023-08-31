<script lang="ts">
import { onMount } from 'svelte';
import Device from 'svelte-device-info';
// @ts-ignore
import Countdown from '$lib/countdown';
import { Span } from 'flowbite-svelte';
import { holidays } from '../stores';
import FlipContainer from '../lib/countdown/FlipContainer.svelte';
import _ from 'lodash';
import dayjs from 'dayjs';

$: holiday = [];
let color = 'text-lime-400';
let textSize = 'text-4xl md:text-8xl';

const countdownLabelClass = 'text-center text-xs dark:text-white';

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
      <Countdown endTime={h.date} let:remaining>
        {#if !Device.isMobile}
          <div class="flex">
            <div class="grid grid-cols-5 gap-2">
              {#if !remaining.done}
                {#if remaining.months > 0}
                  <div class="flex flex-col">
                    <FlipContainer digit={remaining.months} {color} {textSize} />
                    <span class={countdownLabelClass}>Months</span>
                  </div>
                {/if}
                <div class="flex flex-col">
                  <FlipContainer digit={remaining.days} {color} {textSize} />
                  <span class={countdownLabelClass}>Days</span>
                </div>
                <div class="flex flex-col">
                  <FlipContainer digit={remaining.hours} {color} {textSize} />
                  <span class={countdownLabelClass}>Hours</span>
                </div>
                <div class="flex flex-col">
                  <FlipContainer digit={remaining.minutes} {color} {textSize} />
                  <span class={countdownLabelClass}>Minutes</span>
                </div>
                <div class="flex flex-col">
                  <FlipContainer digit={remaining.seconds} {color} {textSize} />
                  <span class={countdownLabelClass}>Seconds</span>
                </div>
              {/if}
            </div>
          </div>
        {:else}
          <div class="block">
            {#if !remaining.done}
              {#if remaining.months > 0}
                <Span class="text-lg">{remaining.months} 月</Span>
              {/if}
              <Span class="text-lg">{remaining.days} 天</Span>
              <Span class="text-lg">{remaining.hours} 小時</Span>
              <Span class="text-lg">{remaining.minutes} 分</Span>
              <Span class="text-lg">{remaining.seconds} 秒</Span>
            {/if}
          </div>
        {/if}
      </Countdown>
    </div>
  {/each}
{/if}
