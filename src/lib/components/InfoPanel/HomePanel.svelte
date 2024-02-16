<script>
    import { afterUpdate, onMount } from 'svelte';
    import SearchBar from '$lib/components/SearchBar.svelte';
    import InfoPanel from '$lib/components/InfoPanel/InfoPanel.svelte';
    import { remountSearchbar } from '$lib/scripts/stores.js';

     /** @type {import('./$types').PageData} */
     import { getContext, setContext } from 'svelte';

    export let title = "Title";
    export let subtitle = "Longer description";
    let loadState = false;

    onMount(() => {
        loadState = true;
    });

    const selectedFeature = getContext('selectedFeature');

    afterUpdate(() => {
        if (document.getElementById('geocoder')){
            let length = document.getElementById('geocoder').children.length;

            if (length == 0){
                remountSearchbar.update((n) => n+1);
            }
       }
    })

    function handleSearch(event) {
        const searchTerm = event.detail;
        // TODO: add logic to update the map based on the search term
    }

    //Home page tab button names
       $: items = [
            {
                desc: "Top Statistics",
             },
            {
                desc: "Random Evictor",
            },
            {
                desc: "Eviction Primer",
            },
            {
                desc: "What happeneds in court?",
            },
            {
                desc: "Reports",
            },
            {
                desc: "Gallery",
            },
        ]

</script>
{#if loadState }
    {#if $selectedFeature.length == 0 }
    <div class="home-panel">
        <div class="title has-text-dark is-size-1 has-text-centered">
            {title}
        </div>
        <div class="subtitle mt-1 has-text-dark is-size-6 has-text-centered">
                {subtitle}
        </div>
        <div class="centered">
            {#key $selectedFeature}
                 <SearchBar key={$selectedFeature} on:search={handleSearch} />
            {/key}
        </div>
    </div>
    {/if}
    {#if $selectedFeature.length >= 1}
       <InfoPanel/>
    {/if}
{/if}





