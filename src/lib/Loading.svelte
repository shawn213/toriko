<script lang="ts">
import { Plane } from 'svelte-loading-spinners';
</script>

<div class="overlay">
  <Plane color="#FF3E00" size="8" />
</div>

<style>
.overlay {
  background: gray;
  width: 100%;
  height: 100vh;
  position: absolute;
  z-index: 999;
  opacity: 0.3;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
