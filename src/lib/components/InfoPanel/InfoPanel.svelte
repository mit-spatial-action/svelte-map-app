<script>
    import { onMount } from 'svelte';
     /** @type {import('./$types').PageData} */
     import { getContext } from 'svelte';

    let loadState = false;
    onMount(() => loadState = true);

    const selectedFeature = getContext('selectedFeature');
</script>

{#if loadState }
    <div class="title has-text-dark is-size-1 has-text-centered">
        {$selectedFeature[0].properties.landlord_name}
    </div>
    <div class="subtitle mt-1 has-text-dark is-size-6 has-text-centered">
        Eviction Rank: { $selectedFeature[0].properties.eviction_rank } <br/>
        Evictions: {$selectedFeature[0].properties.evictions} <br/>
        Address: { $selectedFeature[0].properties.place_name} <br/>
    </div>
{/if}
