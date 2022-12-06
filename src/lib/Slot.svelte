<script lang="ts">
// import { Button } from 'flowbite-svelte';
// const trggleAnimation = () => {
//   play = !play;
// };
export let array: any[];
export let value: any = '';
export let play: boolean = true;
let result: string;

$: if (!play) {
  const num = Math.floor(Math.random() * array.length);
  result = `${array.splice(num, 1)}`;
  value = result;
}
</script>

<div class="block">
  <div class="result">
    <div class="result-txt" class:is-play={play}>
      {#if play}
        {#each array as item}
          <div class="result-item dark:text-white">{item}</div>
        {/each}
      {:else}
        <div class="result-item dark:text-white">{result}</div>
      {/if}
    </div>
  </div>
</div>

<style>
.result {
  height: 70px;
  border-radius: 4px;
  border: 2px solid gray;
  overflow: hidden;
}
.result-item {
  font-size: 48px;
  display: flex;
  justify-content: center;
  line-height: 70px;
}
.is-play.result-txt {
  animation: resultPlay 100ms infinite linear;
}

@keyframes resultPlay {
  0% {
    transform: translateY(0%);
  }
  10% {
    transform: translateY(-10%);
  }
  50% {
    transform: translateY(-50%);
  }
  100% {
    transform: translateY(-90%);
  }
}
</style>
