<script lang="ts">
    import { cn } from "$lib/utils.js";
    export let className ="";
    
</script>
<div class={cn("bg", className)}>
    <div class="wave wave1"></div>
    <div class="wave wave2"></div>
    <div class="wave wave3"></div>
    <div class="wave wave4"></div>
    <div class="wave wave5"></div>
    <div class="wave wave6"></div>
    <slot />
</div>
<style>
    .bg {
        z-index: -1;
    position: absolute;
    margin: 0;
    padding: 0;
    top:0;
    right: 0;
    width: 180%;
    height: 107%;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
}

.wave {
    position: absolute;
    border-radius: 50%;
    opacity: 0.8;
    mix-blend-mode: overlay;
    overflow: hidden;

}

.wave1 {
    width: 100%;
    height: 190%;
    top: -10%;
    left: -25%;
    transform: rotate(33deg);
    background: radial-gradient(circle, rgba(67,0,11) 0%, rgba(45, 0, 23, 0.7) 70%);
}

.wave2 {
    width: 130%;
    height: 90%;
    top: 65%;
    right: -60%;
    background: radial-gradient(circle, rgba(107,0,34) 0%, rgba(31,42,77,0) 70%);
    transform: rotate(-15deg);
}

.wave3 {
    width: 110%;
    height: 120%;
    bottom: -10%;
    left: 50%;
    background: radial-gradient(circle, rgba(107,0,57) 0%, rgba(107,0,34,0.6) 70%);
    transform: rotate(78deg);
}

.wave4 {
    width: 100%;
    height: 100%;
    bottom: 50%;
    right: -20%;
    background: radial-gradient(circle, rgba(107,0,34) 0%, rgba(107,0,34,0.6) 70%);
}

.wave5 {
    width: 130%;
    height: 150%;
    top: 20%;
    left: 5%;
    transform: rotate(107deg);
    background: radial-gradient(circle, rgba(107,0,34) 0%, rgba(107,0,34,0.6) 80%);
}

.wave6 {
    width: 130%;
    height: 100%;
    bottom: 20%;
    right: 20%;
    background: radial-gradient(circle, rgba(107,0,34) 0%, rgba(107,0,34,0.6) 80%);
}

</style>