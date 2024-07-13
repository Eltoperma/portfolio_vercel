<script lang="ts">
	import ImageCard from './ImageCard.svelte';
    import Overlay from './Overlay.svelte';
    import titleStore from '../titleStore';
	titleStore.set('Gallerie');
    let overlayVisible = false;
    let overlaySrc = '';

    function handleImageClick(event: CustomEvent) {
        overlaySrc = event.detail.src.replace('.jpg', '-large.jpg');
        overlayVisible = true;
    }
    function closeOverlay() {
        overlayVisible = false;
        overlaySrc = '';
    }
</script>
    <div class="flex-row flex-wrap flex justify-center">
  <ImageCard title="Sex" description="Aufnahme von mir in heimlicher Umgebung" src="pfp.jpg" on:click={handleImageClick}/>
  <ImageCard title="Sex" description="Aufnahme von mir in heimlicher Umgebung" src="pfp.jpg" on:click={handleImageClick}/>
  <ImageCard title="Sex" description="Aufnahme von mir in heimlicher Umgebung" src="pfp.jpg" on:click={handleImageClick}/>
  <ImageCard title="Sex" description="Aufnahme von mir in heimlicher Umgebung" src="pfp.jpg" on:click={handleImageClick}/>
  <ImageCard title="Sex" description="Aufnahme von mir in heimlicher Umgebung" src="pfp.jpg" on:click={handleImageClick}/>
</div>

{#if overlayVisible}
  <Overlay src={overlaySrc} onClose={closeOverlay} />
{/if}
