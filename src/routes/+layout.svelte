<script>
	import ModeWatcher from './../../node_modules/mode-watcher/dist/mode-watcher.svelte';
	import Button from './../lib/components/ui/button/button.svelte';
	import ScrollArea from './../lib/components/ui/scroll-area/scroll-area.svelte';
	import '../app.css';
	import Sun from 'svelte-radix/Sun.svelte';
	import Moon from 'svelte-radix/Moon.svelte';
	import { toggleMode } from 'mode-watcher';
</script>

<header class="h-24 justify-between align-middle flex bg-gray-100 dark:bg-slate-900 shadow-xl">
	<a href="/" class="w-24">
		<img src="favicon.svg" alt="test" class="h-full p-2" />
	</a>
	<h1 class="font-sans m-auto font-bold h-fit text-3xl">Moin Moin !</h1>

	<Button on:click={toggleMode} variant="outline" size="icon" class="relative top-0 right-0">
		<Sun
			class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
		/>
		<Moon
			class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
		/>
		<span class="sr-only">Toggle theme</span>
	</Button>
</header>
<div class="p-4 sm:p-8">
	<ModeWatcher />
	<ScrollArea class="w-full h-full whitespace-nowrap">
		<slot />
	</ScrollArea>
</div>
