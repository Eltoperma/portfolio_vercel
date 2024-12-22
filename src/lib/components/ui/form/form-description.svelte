<script lang="ts">
	import * as FormPrimitive from 'formsnap';
	import { cn } from '$lib/utils.js';

	type $$Props = FormPrimitive.DescriptionProps;
	interface Props {
		class?: $$Props['class'];
		children?: import('svelte').Snippet<[any]>;
		[key: string]: any
	}

	let { class: className = undefined, children, ...rest }: Props = $props();
	
</script>

<FormPrimitive.Description
	class={cn('text-[0.8rem] text-muted-foreground', className)}
	{...rest}
	
>
	{#snippet children({ descriptionAttrs })}
		{@render children?.({ descriptionAttrs, })}
	{/snippet}
</FormPrimitive.Description>
