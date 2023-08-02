<script>
    import Map from '$lib/Map/Map.svelte'
    import d from '$lib/config/instance.json'
    /** @type {import('./$types').PageData} */
    export let data
</script>
<section>
    <Map 
        mapbox_token={data.mapbox_token}
        >
    </Map>
</section>