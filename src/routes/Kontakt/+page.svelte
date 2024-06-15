<script lang="ts">
	import KontaktForm from './kontakt-form.svelte';
	import type { PageData } from './$types.js';
	export let data: PageData;
	import titleStore from '../titleStore';
	titleStore.set('Kontakt');
</script>

<div class="flex h-full mb-8">
	<div class="m-auto w-2/4 p-8 mt-4 bf-white dark:bg-slate-800 rounded-xl shadow-xl">
		<p class="py-4 whitespace-normal">
			Denken Sie daran in ihre Nachricht mir möglichkeiten zu nennen wie ich Sie erreichen kann!
		</p>
		<KontaktForm data={data.form} />
	</div>
</div>
