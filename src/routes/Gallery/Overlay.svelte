<script lang="ts">
	import AspectRatio from './../../lib/components/ui/aspect-ratio/aspect-ratio.svelte';
  export let src: string;
  export let onClose: () => void;

  function handleClick(event: MouseEvent) {
    if (event.target === event.currentTarget) {
      onClose();
    }
  }
</script>

<div class="fixed top-0 left-0 w-full h-full flex justify-center items-center p-24 z-0 bg-black bg-opacity-80">
  <AspectRatio ratio={1/1} class="m-auto z-10 min-w-[400px] max-w-[850px] min-h-[400px] max-h-[850px]">
    <button class="fixed top-0 left-0 w-full h-full flex justify-center items-center p-24 z-auto cursor-default" on:click={handleClick}/>
      <img class="h-full w-full object-cover" {src} alt="Large preview" /> 
    </AspectRatio>
</div>
