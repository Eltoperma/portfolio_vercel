<script lang="ts">
    import * as Form from "$lib/components/ui/form";
    import { Input } from "$lib/components/ui/input";
	import Textinput from "$lib/components/ui/textinput/textinput.svelte";
    
    import { formSchema, type FormSchema } from "./schema";
    import {
      type SuperValidated,
      type Infer,
      superForm,
    } from "sveltekit-superforms";
    import { zodClient } from "sveltekit-superforms/adapters";
   
    export let data: SuperValidated<Infer<FormSchema>>;
   
    const form = superForm(data, {
      validators: zodClient(formSchema),
    });
   
    const { form: formData, enhance } = form;
  </script>
   
  <form method="POST" use:enhance>
    <Form.Field {form} name="username">
      <Form.Control let:attrs>
        <Form.Label>Name</Form.Label>
        <Input class="border-gray-400" {...attrs} bind:value={$formData.username} />
      </Form.Control>
      <Form.FieldErrors />
    </Form.Field>
    <Form.Field {form} name="message">
      <Form.Control let:attrs>
        <Form.Label>Nachricht</Form.Label>
        <!-- <Input   class="h-48 border-gray-400 whitespace-normal" {...attrs} bind:value={$formData.message}  /> -->
        <Textinput class="h-48 border-gray-400 whitespace-normal" {...attrs} bind:value={$formData.message} />
      </Form.Control>
      <Form.FieldErrors />
    </Form.Field>
    <Form.Button>Abschicken</Form.Button>
  </form>