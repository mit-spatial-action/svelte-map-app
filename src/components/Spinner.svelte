<script>
	import { loadingState } from '../scripts/stores.js';
    import { fade, fly } from 'svelte/transition';
    export let duration = 1.2;
    export let border = 5;
    export let primaryColor = "red";
    export let accentColor = "red";

    let loading;
    loadingState.subscribe((data) => {
        loading = data;
    });
</script>

{#if loading}
<div transition:fade class="wrapper">
    <div transition:fly={{ y: 150, duration: 500 }} class="ripple">
        <div style="
        --accentColor: {accentColor}; 
        --primaryColor: {primaryColor}; 
        --duration: {duration}; 
        --border: {border};"/>
        <div style="
        --accentColor: {accentColor}; 
        --primaryColor: {primaryColor}; 
        --duration: {duration}; 
        --border: {border}; 
        animation-delay: -{duration/6}s;"/>
        <div style="
        --accentColor: {accentColor}; 
        --primaryColor: {primaryColor}; 
        --duration: {duration}; 
        --border: {border}; 
        animation-delay: -{2 * duration / 6}s;"/>
        <div style="
        --accentColor: {accentColor}; 
        --primaryColor: {primaryColor}; 
        --duration: {duration}; 
        --border: {border}; 
        animation-delay: -{3 * duration / 6}s;"/>
        <div style="
        --accentColor: {accentColor}; 
        --primaryColor: {primaryColor}; 
        --duration: {duration}; 
        --border: {border}; 
        animation-delay: -{4 * duration / 6}s;"/>
        <div class="circle" style="
        --accentColor: {accentColor};"/>
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
		background: rgb(255 255 255 / .6);
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
        border: calc(var(--border) * 0.75px) solid;
        opacity: 1;
        border-radius: 50%;
        animation: ripple calc(var(--duration) * 1s) cubic-bezier(0, 0.2, 0.8, 1) infinite;
    }

    .ripple div.circle {
        background: var(--accentColor);
        top: 30px;
        left: 30px;
        width: 20px;
        height: 20px;
        border: 0px solid #000;
    }
    @keyframes ripple {
        0% {
        top: 36px;
        left: 36px;
        width: 8px;
        height: 8px;
        opacity: 0;
        border-color: var(--accentColor);
        }
        4.9% {
        top: 36px;
        left: 36px;
        width: 8px;
        height: 8px;
        opacity: 0;
        border-color: var(--accentColor);
        }
        15% {
        top: 36px;
        left: 36px;
        width: 8px;
        height: 8px;
        opacity: 1;
        border-color: var(--accentColor);
        }
        100% {
        top: 0;
        left: 0;
        width: 80px;
        height: 80px;
        opacity: 0;
        border-color: var(--primaryColor);
        }
    }
</style>