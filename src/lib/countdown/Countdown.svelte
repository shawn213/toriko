<script>
  import FlipContainer from './FlipContainer.svelte';
  import { readable } from 'svelte/store';
  import { onDestroy, onMount } from 'svelte';
  import dayjs from 'dayjs';
  import duration from 'dayjs/plugin/duration.js';
  import utc from 'dayjs/plugin/utc.js';
  import tz from 'dayjs/plugin/timezone.js';
  import customParseFormat from 'dayjs/plugin/customParseFormat.js';

  dayjs.extend(duration);
  dayjs.extend(utc);
  dayjs.extend(tz);
  dayjs.extend(customParseFormat);

  export let endTime;
  export let color;

  const countdownClass = 'grid grid-cols-5 gap-2';
  const countdownLabelClass = 'text-center text-xs dark:text-white';

  let months,
    days,
    hours,
    mintues,
    seconds = 0;

  let done = false;
  const TIME_COUNTDOWN = readable(endTime.diff(dayjs()), (set) => {
    set(endTime.diff(dayjs()));

    const interval = setInterval(() => {
      set(endTime.diff(dayjs()));
    }, 1000);

    return () => clearInterval(interval);
  });

  let timeRemainingUnsubscribe = TIME_COUNTDOWN.subscribe((time) => {
    const date = dayjs.duration(time);
    const diff = endTime.valueOf() - dayjs().valueOf();
    if (diff > 0) {
      months = date.months();
      days = date.days();
      hours = date.hours();
      mintues = date.minutes();
      seconds = date.seconds();
      done = false;
    } else {
      months = 0;
      days = 0;
      hours = 0;
      mintues = 0;
      seconds = 0;
      done = true;
    }
  });

  onDestroy(() => {
    timeRemainingUnsubscribe();
  });
</script>

<div class="flex">
  <div class={countdownClass}>
    {#if !done}
      {#if months > 0}
        <div class="flex flex-col">
          <FlipContainer digit={months} {color} />
          <span class={countdownLabelClass}>Months</span>
        </div>
      {/if}
      <div class="flex flex-col">
        <FlipContainer digit={days} {color} />
        <span class={countdownLabelClass}>Days</span>
      </div>
      <div class="flex flex-col">
        <FlipContainer digit={hours} {color} />
        <span class={countdownLabelClass}>Hours</span>
      </div>
      <div class="flex flex-col">
        <FlipContainer digit={mintues} {color} />
        <span class={countdownLabelClass}>Mintues</span>
      </div>
      <div class="flex flex-col">
        <FlipContainer digit={seconds} {color} />
        <span class={countdownLabelClass}>Seconds</span>
      </div>
    {/if}
  </div>
</div>
