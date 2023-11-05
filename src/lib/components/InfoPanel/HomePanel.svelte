<script>
    import { onMount } from 'svelte';
    import SearchBar from '$lib/components/SearchBar.svelte';
     /** @type {import('./$types').PageData} */

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

    <div>
        <div class="title has-text-dark is-size-1 has-text-centered">
            {title}
        </div>
        <div class="subtitle mt-1 has-text-dark is-size-6 has-text-centered">
                {subtitle}
        </div>
        <div class="centered">
            <SearchBar on:search={handleSearch} />
        </div>
    </div>
{/if}




