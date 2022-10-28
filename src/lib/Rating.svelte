<script lang="ts">
import StarRating from 'svelte-star-rating';
const config = {
	emptyColor: 'hsl(240, 80%, 85%)',
	showText: true,
};
const style = 'margin-bottom: 0px';
export let rating: number = 0;
</script>

<StarRating {rating} {config} {style} />
