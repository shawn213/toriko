<script lang="ts">
import { Plane } from 'svelte-loading-spinners';
</script>

<div class="fixed inset-0 z-40 bg-gray-900 bg-opacity-50 dark:bg-opacity-80">
  <div class="overlay">
    <Plane color="#FF3E00" size="8" />
  </div>
</div>

<style>
.overlay {
  background: gray;
  position: absolute;
  z-index: 999;
  opacity: 0.3;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
