<script lang="ts">
	import KontaktForm from './kontakt-form.svelte';
  import type { PageData } from "./$types.js";
  export let data: PageData;
  
</script>
 
<div class="flex">
  <div class="m-auto w-2/4 p-8 mt-4 bf-white dark:bg-slate-800 rounded-xl shadow-xl">
    <p class="py-4">Denken Sie daran in ihre Nachricht mir möglichkeiten zu nennen wie ich Sie erreichen kann!</p>
    <KontaktForm data={data.form} />
  </div>
</div>