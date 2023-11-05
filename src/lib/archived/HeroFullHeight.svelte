<script>
    import WelcomeButton from '$lib/components/WelcomeButton.svelte';
    import { onMount } from 'svelte';
    import { slide, fade } from 'svelte/transition';
    import Map from '$lib/components/Map/Map.svelte';
    import SearchBar from '$lib/components/SearchBar.svelte';
     /** @type {import('./$types').PageData} */
    
    export let token

    export let title = "Title";
    export let subtitle = "Longer description";
    let loadState = false;
    onMount(() => loadState = true);

    function handleSearch(event) {
        const searchTerm = event.detail;
        // TODO: add logic to update the map based on the search term
    }

</script>

{#if loadState}

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
                    <SearchBar on:search={handleSearch} />
                </div>
                </div>
            
                <div class="column homepage has-background-light is-half no-scroll">
                    <Map mapbox_token={token}/>
                </div>
            </div>
    </div>

{/if}