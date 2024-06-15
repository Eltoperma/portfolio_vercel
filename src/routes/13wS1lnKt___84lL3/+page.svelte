<script lang="ts">
	import { onMount } from 'svelte';
	import titleStore from '../titleStore';
	titleStore.set('Lew du stinkst :D:D:D:D:D');
	let audio: HTMLAudioElement | null = null;
	let isPlaying = false;

	onMount(() => {
		if (audio) {
			audio
				.play()
				.then(() => {
					isPlaying = true;
				})
				.catch((error) => {
					console.error('Error playing audio:', error);
				});
		}
	});

	function playAudio() {
		if (audio && !isPlaying) {
			audio
				.play()
				.then(() => {
					isPlaying = true;
				})
				.catch((error) => {
					console.error('Error playing audio:', error);
				});
		}
	}
</script>

{#if !isPlaying}
	<button on:click={playAudio}>Play Audio</button>
{/if}
<audio
	bind:this={audio}
	src="/secrets/TGV3IHdlbm4gZHUgZGFzIGxpZcOfdCwgZGFubiBiaXN0IGR1IGJpZ2JyYWluZWQgOkQ=.mp3"
	preload="auto"
></audio>

<main class="h-dvh w-full"></main>

<style>
	main {
		background-image: url('/secrets/shuuuuuuuuuuuush.jpeg');
		background-repeat: no-repeat;
		background-size: cover;
	}
</style>
