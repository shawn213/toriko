<script lang="ts">
import { Activity, ActivityItem } from 'flowbite-svelte';

let activities = [
  {
    title: '網頁建立成功',
    date: '2022/10/24',
    alt: 'image alt here',
    src: 'https://rd.fharr.com/assets/sprite/%EB%AA%AC%EC%8A%A4%ED%84%B0/idle/angeling.gif',
  },
  {
    title: '加入隨選功能',
    date: '2022/10/29',
    alt: 'image alt here',
    src: 'https://rd.fharr.com/assets/sprite/%EB%AA%AC%EC%8A%A4%ED%84%B0/idle/angeling.gif',
  },
  {
    title: '加入新增店家功能',
    date: '2022/11/02',
    alt: 'image alt here',
    src: 'https://rd.fharr.com/assets/sprite/%EB%AA%AC%EC%8A%A4%ED%84%B0/idle/angeling.gif',
  },
  {
    title: '加入新增配對抽籤功能',
    date: '2022/12/11',
    alt: 'image alt here',
    src: 'https://rd.fharr.com/assets/sprite/%EB%AA%AC%EC%8A%A4%ED%84%B0/idle/angeling.gif',
  },
];
</script>

<div class="block">
  <Activity>
    <ActivityItem {activities} />
  </Activity>
</div>
