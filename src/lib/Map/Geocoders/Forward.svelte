<script>
    import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
    import { onMount, getContext } from 'svelte';
    import { mapbox, key } from '$lib/scripts/mapbox';

    export let location;
    export let singleMarker = true;
    const { getMap } = getContext(key);
    const map = getMap()
    const geocoder = new MapboxGeocoder({
        accessToken: mapbox.accessToken,
        mapboxgl: mapbox,
        countries: 'us',
        types: 'address,poi'
    });
    onMount(() => {
        geocoder.addTo('#geocoder');
        geocoder.on('result', (e) => {
            let result = e.result
            location.lngLat = result.geometry.coordinates;
            location.context = result.context;
        });
    });
    
</script>
<div id="geocoder">

</div>

<style>
    div {
        position: absolute;
        z-index: 50;
        /* left: 0px;
        bottom: 0px;
        min-height:50%; */
    }
</style>