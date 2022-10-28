<script>
import { Router } from '@roxi/routify';
import { routes } from '../.routify/routes';
const config = {
	urlTransform: {
		apply: (url) => `${'/toriko'}${url}`, //external URL
		remove: (url) => url.replace('/toriko', ''), //internal URL
	},
};
</script>

<Router {routes} {config} />
