<script>
    import { onDestroy, onMount, setContext } from 'svelte';
    import ForwardGeocoder from '$lib/Map/Geocoders/Forward.svelte';
    import ReverseGeocoder from '$lib/Map/Geocoders/Reverse.svelte';
    import Marker from '$lib/Map/Marker.svelte';
    import InfoBox from '$lib/Map/InfoBox.svelte';
    import RippleLoader from '$lib/RippleLoader.svelte';
    
    import 'mapbox-gl/dist/mapbox-gl.css';

    import { mapbox, key } from '$lib/scripts/utils';

    export let mapbox_token;
    mapbox.accessToken = mapbox_token;
    
    import InvalidModal from '$lib/Map/InvalidModal.svelte';
    let locationInvalid = false;

    export let projection = 'globe';
    export let style = 'mapbox://styles/mapbox/satellite-v9';
    export let init = {
        "lngLat": [-120, 42],
        "zoom": [1.8, 3],
        "zoomDur": 3000
    };
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
        map = new mapbox.Map({
            container: container,
            style: style,
            center: init.lngLat,
            zoom: (init.zoom.length === 2) ? init.zoom[0] : init.zoom,
            bearing: 0,
            projection: projection,
            maxBounds: maxBounds
        });
        
        map.on ('load', () => {
            map.resize();
        });
        map.once('zoomend', () => {
            loadingState = !loadingState
        });
        map.on('style.load', () => {
            map.on('click', (e) => {
                location.lngLat = e.lngLat;
                loadingState = !loadingState;
            })
            map.setFog({
                'color': 'rgba(255, 255, 255, 0.3)',
                'high-color': '#eb0289',
                'horizon-blend': 0.015, // default: .1
                'space-color': '#feeac3', 
                'star-intensity': 1
            })
            if (init.zoom.length === 2) {
                map.flyTo({
                    center: init.lngLat,
                    zoom: init.zoom[1],
                    duration: init.zoomDur,
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

<!-- <Modal bind:showModal>
    Please select a point within the United States.
</Modal> -->
<div class="container">
    <div id ="map" class="is-fullheight" bind:this={container}>
        {#if map}
            <RippleLoader bind:loadingState />
            <Marker bind:location bind:singleMarker />
            <ReverseGeocoder bind:location bind:loadingState />
            <ForwardGeocoder bind:location bind:loadingState />
            <InvalidModal bind:locationInvalid/>
        {/if}
    </div>
    <InfoBox bind:location/>
</div>