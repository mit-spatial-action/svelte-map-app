<script>
    import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
    import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
    import { onMount, getContext } from 'svelte';
    import { mapbox, key } from '$lib/scripts/utils';
    export let location;
    const { getMap } = getContext(key);
    const geocoder = new MapboxGeocoder({
        accessToken: mapbox.accessToken,
        mapboxgl: mapbox,
        countries: 'us',
        types: 'address,poi',
        marker: false
    });
    onMount(() => {
        let map = getMap()
        map.addControl(geocoder, 'top-left');
        geocoder.on('result', (e) => {
            let result = e.result
            let coords = result.geometry.coordinates;
            location.lngLat = new mapbox.LngLat(coords[0], coords[1]);
            location.address = result.address;
            location.place_type = result.place_type[0];
            location.text = result.text;
            location.context = result.context;
        });
    });
    
</script>