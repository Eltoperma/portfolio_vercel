
<script lang="ts">

  	import { superForm, fileProxy  } from 'sveltekit-superforms'
  	import { zodClient } from 'sveltekit-superforms/adapters'
  	import { formSchema } from './schema'
	import titleStore from '../../titleStore';

	titleStore.set('Bilder hochladen');

  	export let data;

  	const { form, enhance, errors } = superForm(data.form, {
    	validators: zodClient(formSchema)
 	 })

  const file = fileProxy(form, 'image')
</script>


<form class="p-4 rounded-xl  bg-my-blue flex flex-col w-2/3 mx-auto space-y-2" method="POST" enctype="multipart/form-data" use:enhance>
	<label for="title">Titel</label>
	<input class="rounded-lg" name="title"/>
	<label for="description">Beschreibung</label>
	<textarea class="h-24 rounded-lg" name="description" />
  <input class="cursor-pointer h-12"
    type="file"
    name="images"
    accept="image/png, image/jpeg, image/webp"
	bind:files={$file}
  />
  {#if $errors.image}<span class="text-my-red">{$errors.image}</span>{/if}
  <button class="bg-black text-white w-48 p-1 rounded-lg" >Hochladen</button>
</form>


