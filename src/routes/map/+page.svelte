<script>
    import Map from '$lib/Map/Map.svelte'
    import site_data from '$lib/config/instance.json'
    /** @type {import('./$types').PageData} */
    export let data
</script>
<section>
    <Map 
        mapbox_token={data.mapbox_token}
        maxBounds={site_data.mapProps.maxBounds} 
        style={site_data.mapProps.style}>
    </Map>
</section>