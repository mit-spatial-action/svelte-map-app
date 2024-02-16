<script>
    import { afterUpdate, onMount } from 'svelte';
     /** @type {import('./$types').PageData} */
     import { getContext } from 'svelte';
     import { mapbox, key } from '$lib/scripts/utils';


    let loadState = false;
    onMount(() => {
        loadState = true;        
    });

    const selectedFeature = getContext('selectedFeature');
    
   // const { getMap } = getContext(key);
   // const map = getMap()

    function clearState() {
        selectedFeature.update(selectedFeature => []); 
        //map.removeLayer('selectedGeom');
        //map.removeSource('selectedGeom');   
    }

</script>

{#if loadState }
    <div class="is-flex-align-start mx-5">

    <p class="block mt-2 is-size-5" on:click={clearState}>
        <span class="has-text-link">&#8592 </span><u>Back</u> to search
    </p>

    <div class="title has-text-dark is-size-1 has-text-left block">
        {$selectedFeature[0].properties.landlord_name}
    </div>
    <div class="subtitle mt-1 has-text-dark is-size-5 has-text-left block">
        Between September, 2019, and February, 2022, <b>{$selectedFeature[0].properties.landlord_name}</b> was the 
        cause of approximately <b>{$selectedFeature[0].properties.evictions}</b> people losing their homes or experiencing housing instability.
    </div>
    <div class="subtitle mt-1 has-text-dark is-size-6 has-text-centered block">
        Eviction Rank: { $selectedFeature[0].properties.eviction_rank } <br/>
        Evictions: {$selectedFeature[0].properties.evictions} <br/>
        Address: { $selectedFeature[0].properties.place_name} <br/>
    </div> 
    </div>
{/if}
