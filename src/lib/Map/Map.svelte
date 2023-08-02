<script>
    import { onDestroy, onMount, setContext } from 'svelte';
    import ForwardGeocoder from '$lib/Map/Geocoders/Forward.svelte';
    import ReverseGeocoder from '$lib/Map/Geocoders/Reverse.svelte';
    import SelectedGeometry from '$lib/Map/SelectedGeometry.svelte';
    import Marker from '$lib/Map/Marker.svelte';
    import InfoBox from '$lib/Map/InfoBox.svelte';
    import RippleLoader from '$lib/RippleLoader.svelte';
    
    import 'mapbox-gl/dist/mapbox-gl.css';

    import { mapbox, key } from '$lib/scripts/utils';

    export let mapbox_token;
    mapbox.accessToken = mapbox_token;

    export let style = 'mapbox://styles/mapbox/satellite-v9';
    export let projection = 'globe';
    export let initLngLat = [-120, 42];
    initLngLat = new mapbox.LngLat(initLngLat[0], initLngLat[1])
    export let initZoom = [1.8 ,3];
    export let initZoomDur  = 3000;
    
    export let singleMarker = true;
    export let maxBounds = [
        [-179,19], 
        [-67,72]
    ]

    export let resultZoom = 10;
    export let resultFlySpeed = 2000;
    
    let container;
    let map;

    setContext(key, {
        getMap: () => map
    });

    let location = {};
    let loadingState = true;

    function flyToLngLat(lngLat){
        map.flyTo({
            center: lngLat,
            zoom: (map.getZoom() > resultZoom) ? map.getZoom() : resultZoom,
            duration: resultFlySpeed,
            essential: true
        });
    }

    $: ('lngLat' in location) ? flyToLngLat(location.lngLat) : null;

    onMount(() => {
        let mapOptions = {
            container: container,
            style: style,
            center: initLngLat,
            zoom: (initZoom.length === 2) ? initZoom[0] : initZoom,
            bearing: 0,
            projection: projection,
            maxBounds: maxBounds
        }
        map = new mapbox.Map(mapOptions);
        
        map.on ('load', () => {
            map.resize();
        });
        map.once('zoomend', () => {
            loadingState = !loadingState
        });
        map.on('style.load', () => {
            map.on('click', (e) => {
                location.lngLat = e.lngLat;
            })
            map.setFog({
                'color': 'rgba(255, 255, 255, 0.3)',
                'high-color': '#eb0289',
                'horizon-blend': 0.015, // default: .1
                'space-color': '#feeac3', 
                'star-intensity': 1
            })
            if (initZoom.length === 2) {
                map.flyTo({
                    center: initLngLat,
                    zoom: initZoom[1],
                    duration: initZoomDur,
                    essential: true
                });
            }
        });
    });

    onDestroy(() => {
        if (map) {
             map.remove()
        };
    });
</script>

<div class="container">
    <div id ="map" class="is-fullheight" bind:this={container}>
        {#if map}
            <RippleLoader bind:loadingState />
            <Marker bind:location bind:singleMarker />
            <ReverseGeocoder bind:location />
            <ForwardGeocoder bind:location />
            <SelectedGeometry bind:location />
            <!-- <InvalidModal bind:locationInvalid/> -->
        {/if}
    </div>
    <InfoBox bind:location/>
</div>