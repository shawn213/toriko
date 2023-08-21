<script lang="ts">
import { Label, Input, Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from 'flowbite-svelte';
import dayjs from 'dayjs';

let startMonth = dayjs().month() + 1;
let endMonth = dayjs().month() + 1;
let manDay = 1;
$: items = [];

const isWorkDay = (date: any) => {
  const holidays = JSON.parse(localStorage.getItem('holidays'));
  return [1, 2, 3, 4, 5].includes(date.day()) && !holidays.days.some((h: any) => h.date === date.format('YYYY-MM-DD'));
};

$: {
  items = [];
  let startDay = dayjs()
    .month(startMonth - 1)
    .startOf('month');
  const endDay = dayjs()
    .month(endMonth - 1)
    .endOf('month')
    .startOf('date');
  let preMonth = startDay.month();
  let idx = 0;
  let workDay = 0;
  let percentDay = 0;
  let percentTime = 0;
  do {
    if (startDay.month() !== preMonth) {
      percentDay = Math.round(workDay * manDay * 10) / 10;
      percentTime = Math.round(workDay * 8 * manDay * 10) / 10;
      items[idx] = { month: startDay.add(-1, 'month').format('MM'), workDay, percentDay, percentTime };
      preMonth = startDay.month();
      console.log(preMonth);
      idx += 1;
      workDay = 0;
      percentDay = 0;
      percentTime = 0;
    }
    workDay += isWorkDay(startDay) ? 1 : 0;
    startDay = startDay.add(1, 'days');
  } while (endDay.diff(startDay, 'days') >= 0);
  percentDay = Math.round(workDay * manDay * 10) / 10;
  percentTime = Math.round(workDay * 8 * manDay * 10) / 10;
  items[idx] = { month: startDay.add(-1, 'month').format('MM'), workDay, percentDay, percentTime };
}
</script>

<div class="block">
  <div class="mb-4">
    <Label class="mb-1">開始月份</Label>
    <Input bind:value={startMonth} />
  </div>
  <div class="mb-4">
    <Label class="mb-1">結束月份</Label>
    <Input bind:value={endMonth} />
  </div>
  <div class="mb-4">
    <Label class="mb-1">man/day</Label>
    <Input bind:value={manDay} />
  </div>
  {#if items.length > 0}
    <Table>
      <TableHead>
        <TableBodyCell>項目</TableBodyCell>
        {#each items as item}
          <TableBodyCell>{item.month}</TableBodyCell>
        {/each}
      </TableHead>
      <TableBody>
        <TableBodyRow>
          <TableBodyCell>總天數</TableBodyCell>
          {#each items as item}
            <TableBodyCell>{item.workDay}</TableBodyCell>
          {/each}
        </TableBodyRow>
        <TableBodyRow>
          <TableBodyCell>換算天數</TableBodyCell>
          {#each items as item}
            <TableBodyCell>{item.percentDay}</TableBodyCell>
          {/each}
        </TableBodyRow>
        <TableBodyRow>
          <TableBodyCell>換算工時</TableBodyCell>
          {#each items as item}
            <TableBodyCell>{item.percentTime}</TableBodyCell>
          {/each}
        </TableBodyRow>
      </TableBody>
    </Table>
  {/if}
</div>
