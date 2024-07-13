<script lang="ts">
    export let title:string;
    export let description:string;
     import { createEventDispatcher } from 'svelte';
     export let src: string;

  const dispatch = createEventDispatcher();

  function handleClick() {
    dispatch('click', { src });
  }
</script>
<div class="bg-white p-2 dark:shadow-gray-800 shadow-lg min-w-[450px] w-1/5 m-4" >
    <button on:click={handleClick}>
        <img src={src} alt="" />
    </button>
        <div class="px-4 p-4 dark:text-black">
            <h4 class="font-handwritten text-xl">{title}</h4>
            <span class="font-handwritten">{description}</span>
        </div>
    </div>