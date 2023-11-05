<script>
    import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
    import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';


    import { onMount, getContext } from 'svelte';
    import { mapbox, key } from '$lib/scripts/utils';

    import Device from 'svelte-device-info'
    $: mobile = Device.isPhone;

    const { getMap } = getContext(key);
    const map = getMap()

    export let gcResult;
    export let lngLat;
    export let selected;

    let coords;

    const SearchGeocoder = new MapboxGeocoder({
        accessToken: mapbox.accessToken,
        mapboxgl: mapbox,
        countries: 'us',
        types: 'address,poi',
        marker: false
    });

    onMount(()=>{
        document.getElementById('geocoder').appendChild(SearchGeocoder.onAdd(map));
    });
</script>