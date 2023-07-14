<script>
	import { loadingState } from '../scripts/stores.js';
    import { fade, fly } from 'svelte/transition';
    export let duration = 1.2;
    export let border = 5;
    export let color = "red";

    let loading;
    loadingState.subscribe((data) => {
        loading = data;
    });
</script>

{#if loading}
<div transition:fade class="wrapper">
    <div transition:fly={{ y: 200, duration: 500 }} class="ripple">
        <div style="
        --color: {color}; 
        --duration: {duration}; 
        --border: {border};"/>
        <div style="
        --color: {color}; 
        --duration: {duration}; 
        --border: {border}; 
        animation-delay: -{duration/2}s;"/>
        <div style="
        --color: {color}; 
        --duration: {duration}; 
        --border: {border}; 
        animation-delay: -{duration/4}s;"/>
    </div>
</div>
{/if}

<style>
    .wrapper {
		display: flex;
		flex-direction: column;
		align-items:center;
		justify-content: center;
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		/* color: rebeccapurple; */
		background: rgb(255 255 255 / .3);
    }

    .ripple,
    .ripple div {
        z-index: 1000;
        box-sizing: border-box;
    }

    .ripple {
        display: inline-block;
        position: relative;
        width: 80px;
        height: 80px;
    }

    .ripple div {
        position: absolute;
        border: calc(var(--border) * 1px) solid var(--color);
        opacity: 1;
        border-radius: 50%;
        animation: ripple calc(var(--duration) * 1s) cubic-bezier(0, 0.2, 0.8, 1) infinite;
    }
    @keyframes ripple {
        0% {
        top: 36px;
        left: 36px;
        width: 8px;
        height: 8px;
        opacity: 0;
        }
        4.9% {
        top: 36px;
        left: 36px;
        width: 8px;
        height: 8px;
        opacity: 0;
        }
        5% {
        top: 36px;
        left: 36px;
        width: 8px;
        height: 8px;
        opacity: 1;
        }
        100% {
        top: 0;
        left: 0;
        width: 80px;
        height: 80px;
        opacity: 0;
        }
    }
</style>