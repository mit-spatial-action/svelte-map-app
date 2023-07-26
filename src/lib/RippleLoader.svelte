<script>
	import { loadingState } from '../scripts/stores.js';
    import { fade, fly } from 'svelte/transition';

    export let duration = 1.2;
    export let border = 3;
    export let primaryColor = "red";
    export let accentColor = "red";
    export let flyInProps = {
        "duration": 500,
        "distance": 150
    };
	export let denom = 6;
    const steps = Array.from(Array(denom - 1), (_, i) => i + 1)

    let loading;
    loadingState.subscribe((data) => {
        loading = data;
    });
</script>

{#if loading}
<div transition:fade class="wrapper">
    <div transition:fly={{ 
        y: flyInProps.distance, 
        duration: flyInProps.duration 
        }} class="rippler">
        {#each steps as step}
            <div class="ripple-wave" style="
            --accentColor: {accentColor}; 
            --primaryColor: {primaryColor}; 
            --duration: {duration}; 
            --border: {border};
            animation-delay: -{ step * duration / denom}s;"/>
        {/each}
        <div class="circle-core" style="
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

    .rippler,
    .rippler div {
        z-index: 1000;
        box-sizing: border-box;
    }

    .rippler {
        display: inline-block;
        position: relative;
        width: 80px;
        height: 80px;
    }

    .rippler div {
        position: absolute;
        opacity: 1;
        border-radius: 50%;
    }

    .rippler .ripple-wave {
        border: calc(var(--border) * 1px) solid;
        animation: ripple calc(var(--duration) * 1s) cubic-bezier(0, 0.2, 0.8, 1) infinite;
    }

    .rippler .circle-core {
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