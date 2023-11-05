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

    const geocoder = new MapboxGeocoder({
        accessToken: mapbox.accessToken,
        mapboxgl: mapbox,
        countries: 'us',
        types: 'address,poi',
        marker: false
    });


    onMount(() => {
        map.addControl(geocoder, 'top-right');
        if (mobile) {
            geocoder.on('clear', (e) => {
                gcResult = undefined;
                lngLat = undefined;
                selected = undefined;
            });
            geocoder.on('results', (e) => {
                selected = undefined;
                gcResult = undefined;
                lngLat = undefined;
            });
        }
        geocoder.on('result', (e) => {
            let result = {};
            let d = e.result;
            coords = d.geometry.coordinates;
            lngLat = new mapbox.LngLat(coords[0], coords[1])
            result.address = d.address;
            result.place_type = d.place_type[0];
            result.text = d.text;
            result.context = d.context;
            gcResult = result;
        });

        document.getElementById('')
    });
    
</script>