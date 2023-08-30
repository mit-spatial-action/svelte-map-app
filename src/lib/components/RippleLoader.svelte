<script>
    export let loadingState;
    import { fade, fly } from 'svelte/transition';

    export let duration = 1.2;
    export let border = 4;
    import site_data from '$lib/config/instance.json';
    export let primaryColor = site_data.primaryColor;
    export let warningColor = site_data.warningColor;
    
    export let flyInProps = {
        "duration": 500,
        "distance": 150
    };
	export let denom = 4;
    const steps = Array.from(Array(denom - 1), (_, i) => i + 1)

</script>

{#if loadingState}
<div transition:fade={{duration: 800}} class="wrapper">
    <div transition:fly={{ 
        y: flyInProps.distance, 
        duration: flyInProps.duration 
        }} class="rippler">
        {#each steps as step}
            <div class="ripple-wave" style="
            --warningColor: {warningColor}; 
            --primaryColor: {primaryColor}; 
            --duration: {duration}; 
            --border: {border};
            animation-delay: -{ step * duration / denom}s;"/>
        {/each}
        <div class="circle-core" style="
        --warningColor: {warningColor};"/>
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
		background: #363636BB;
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
        background: var(--warningColor);
        top: 30px;
        left: 30px;
        width: 20px;
        height: 20px;
    }

    @keyframes ripple {
        0% {
            top: 36px;
            left: 36px;
            width: 8px;
            height: 8px;
            opacity: 0.8;
            border-color: var(--warningColor);
        }
        10% {
            top: 36px;
            left: 36px;
            width: 8px;
            height: 8px;
            opacity: 0.8;
            border-color: var(--warningColor);
        }
        15% {
            top: 36px;
            left: 36px;
            width: 8px;
            height: 8px;
            opacity: 0.8;
            border-color: var(--warningColor);
        }
        100% {
            top: 0;
            left: 0;
            width: 80px;
            height: 80px;
            opacity: 0.5;
            border-color: var(--primaryColor);
        }
    }
</style>