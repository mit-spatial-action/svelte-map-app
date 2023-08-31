<script>
    import Map from '$lib/components/Map/Map.svelte';
    /** @type {import('./$types').PageData} */
    export let data
</script>
<section>
    <Map 
        mapbox_token={data.mapbox_token}
    />
</section>