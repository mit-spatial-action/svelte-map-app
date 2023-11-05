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
{/if}




