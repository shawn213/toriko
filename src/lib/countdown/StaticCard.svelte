<script>
export let position;
export let digit;
export let color = 'text-red-500';
</script>

<div class={position}>
  <span class="md:text-8xl font-bold {color}">{`${digit < 10 ? 0 : ''}`}{digit}</span>
</div>

<style lang="scss">
@import '../styles/styles.scss';

.upperCard,
.lowerCard {
  display: flex;
  position: relative;
  justify-content: center;
  width: 100%;
  height: 50%;
  overflow: hidden;
  color: lighten($blue, 0.5);
}

.upperCard {
  align-items: flex-end;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;

  span {
    transform: translateY(50%);
  }
}

.lowerCard {
  align-items: flex-start;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  background-color: lighten($blue, 5%);
  border-top: 0.5px solid transparentize($color: #000000, $amount: 0.7);

  span {
    transform: translateY(-50%);
  }
}
</style>
