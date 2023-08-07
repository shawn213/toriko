<script>
export let animation;
export let digit;
export let color = 'text-red-500';
</script>

<div class="flipCard flex justify-center absolute left-0 w-full h-2/4 overflow-hidden {animation}">
  <span class="md:text-8xl font-bold {color}">{`${digit < 10 ? 0 : ''}`}{digit}</span>
</div>

<style lang="scss">
@import '../styles/styles.scss';

.flipCard {
  backface-visibility: hidden;

  &.unfold {
    top: 50%;
    align-items: flex-start;
    transform-origin: 50% 0%;
    transform: rotateX(180deg); // from 180 to 0
    background-color: $blue;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    border-top: 0.5px solid transparentize($color: #000000, $amount: 0.7);
    background-color: lighten($blue, 5%);

    span {
      transform: translateY(-50%);
    }
  }

  &.fold {
    top: 0%;
    align-items: flex-end;
    transform-origin: 50% 100%;
    transform: rotateX(0deg); // from 0 to -180
    background-color: $blue;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;

    span {
      transform: translateY(50%);
    }
  }
}

$easeInOut: cubic-bezier(0.455, 0.03, 0.515, 0.955);

$turnDuration: 0.6s;

// Animation mixin
@mixin animate($name, $easing, $duration: 300ms, $delay: 0s, $iteration: 1, $direction: normal, $fill-mode: forwards) {
  animation: $name $duration $easing $delay $iteration $direction $fill-mode;
}

.fold {
  @include animate(fold, $easeInOut, 0.6s);
  transform-style: preserve-3d;
}

.unfold {
  @include animate(unfold, $easeInOut, 0.6s);
  transform-style: preserve-3d;
}

@keyframes fold {
  0% {
    transform: rotateX(0deg);
  }
  100% {
    transform: rotateX(-180deg);
  }
}

@keyframes unfold {
  0% {
    transform: rotateX(180deg);
  }
  100% {
    transform: rotateX(0deg);
  }
}
</style>
