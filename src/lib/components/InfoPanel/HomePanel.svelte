<script>
    import { onMount } from 'svelte';
    import SearchBar from '$lib/components/SearchBar.svelte';
     /** @type {import('./$types').PageData} */
     import { getContext } from 'svelte';

    export let title = "Title";
    export let subtitle = "Longer description";
    let loadState = false;
    onMount(() => loadState = true);

    const selectedFeature = getContext('selectedFeature');

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
    <div>
        <div class="title has-text-dark is-size-1 has-text-centered">
            {title}
        </div>
        <div class="subtitle mt-1 has-text-dark is-size-6 has-text-centered">
                {subtitle}
        </div>
        <div class="centered">
            {#key $selectedFeature}
                 <SearchBar on:search={handleSearch} />
            {/key}
        </div>
    </div>
    {/if}
    {#if $selectedFeature.length >= 1}
        <div class="subtitle mt-1 has-text-dark is-size-6 has-text-centered">
            { $selectedFeature[0].properties.landlord_name }
        </div>

    {/if}
{/if}




