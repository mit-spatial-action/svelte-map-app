<script>
    import WelcomeButton from '$lib/components/WelcomeButton.svelte';
    import { onMount } from 'svelte';
    import { slide, fade } from 'svelte/transition';
    import Map from '$lib/components/Map/Map.svelte';
    
    export let title = "Title";
    export let subtitle = "Longer description";
    let loadState = false;
    onMount(() => loadState = true);
</script>

{#if loadState}
<section class="hero-solar is-fullheight-with-navbar">
    <div class="container">
            <div class="columns no-scroll">
            <div class="column homepage has-background-light is-half shadow">
                <p class="title has-text-dark is-size-1">
                    {title}
                </p>
                <p class="subtitle mt-1 has-text-dark is-size-2">
                     {subtitle}
                </p>
                <div>
                    <WelcomeButton/>
                </div>
                </div>
            
                <div class="column homepage has-background-light no-scroll">
                </div>
            </div>
    </div>
</section>
{/if}