<script>
import { Router } from '@roxi/routify';
import { routes } from '../.routify/routes';
import { onMount } from 'svelte';
const config = {
  urlTransform: {
    apply: (url) => `${'/toriko/#'}${url}`, //external URL
    remove: (url) => url.replace('/toriko/#', ''), //internal URL
  },
};
onMount(() => {
  if (!window.location.href.endsWith('/toriko/#/')){
    window.location.href = '/toriko/#/';
  }
});
</script>

<Router {routes} {config} />
