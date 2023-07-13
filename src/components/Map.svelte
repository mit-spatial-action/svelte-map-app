<script>
    import { onDestroy, setContext, onMount } from 'svelte';
	import { mapbox, key } from '../scripts/mapbox.js';
    import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
    import 'mapbox-gl/dist/mapbox-gl.css';
    import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
    
    setContext(key, {
        getMap: () => map
    });

    export let lat;
    export let lng;
    export let init_zoom;
    export let final_zoom;

    let container;
    let map;
    let marker;

    onMount(() => {
        map = new mapbox.Map({
            container: container,
            // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
            style: 'mapbox://styles/ericrobskyhuntley/cljrocy4m017701pa1j212ahy',
            center: [lng - 10, lat - 10],
            zoom: init_zoom,
            bearing: 0,
            projection: 'globe' // starting projection
        });
        const geocoder = new MapboxGeocoder({
            accessToken: mapbox.accessToken,
            mapboxgl: mapbox
        });
        document.getElementById('geocoder').appendChild(geocoder.onAdd(map));
        geocoder.on('result', e => {
            lat = e.result.geometry.coordinates[1]
            lng = e.result.geometry.coordinates[0]
        });
        map.on('style.load', () => {
            map.on('click', (e) => {
                if(typeof marker !== 'undefined') {
                    marker.remove();
                }
                marker = new mapbox.Marker()
                    .setLngLat(e.lngLat)
                marker.addTo(map);
                map.flyTo({
                    center: e.lngLat,
                    zoom: 10,
                    duration: 2000,
                    essential: true // this animation is considered essential with respect to prefers-reduced-motion
                });
                lat = e.lngLat.lat;
                lng = e.lngLat.lng;
            });
            map.setFog({
                'color': 'rgba(255, 255, 255, 0.3)',
                'high-color': '#eb0289',
                'horizon-blend': 0.015, // Exaggerate atmosphere (default is .1),
                'space-color': '#feeac3'//, 
                // 'star-intensity': 1
            }); // Set the default atmosphere style
            map.flyTo({
                center: [-120, 42],
                zoom: final_zoom,
                duration: 6000,
                essential: true // this animation is considered essential with respect to prefers-reduced-motion
            });
        });
    });

    onDestroy(() => {
        if (map) {
             map.remove()
        };
    });
</script>
<div class="columns">
    <div class="column is-one-quarter">
        <div id="map-interface" class="card">
            <div class="card-header">
                <h1 class="card-header-title">test</h1>
            </div>
            <div class="card-content">
                <div class="content">
                    <div id="geocoder" class="block"/>
                    <div class="block">
                        {lat}
                        {lng}
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<div id="map" bind:this={container}>
    {#if map}
        <slot />
    {/if}
</div>

<style>
	#map {
        position: absolute; 
        top: 0; 
        bottom: 0; 
		width: 100%;
		height: 100%;
	}

    #map-interface {
        z-index:1000;
    }
</style>