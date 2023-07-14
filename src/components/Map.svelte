<script>
    import { onDestroy, setContext, onMount } from 'svelte';
	import { mapbox, key } from '../scripts/mapbox.js';
    import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
    import 'mapbox-gl/dist/mapbox-gl.css';
    import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
    
    setContext(key, {
        getMap: () => map
    });

    export let lngLat;
    export let init_zoom=1.8;
    export let final_zoom=3;
    export let init_zoom_duration=6000;

    let container;
    let map;
    let marker;

    function removeMarker() {
        if(typeof marker !== 'undefined') {
            marker.remove();
        }
    }
    function createMarker(lngLat) {
        marker = new mapbox.Marker()
            .setLngLat(lngLat)
        marker.addTo(map);
    }

    function flyToMarker(lngLat, min_zoom = 10){
        let zoom = (map.getZoom() > min_zoom) ? map.getZoom() : min_zoom;
        map.flyTo({
            center: lngLat,
            zoom: zoom,
            duration: 2000,
            essential: true // this animation is considered essential with respect to prefers-reduced-motion
        });
    }

    function markerFlow(lngLat){
        removeMarker();
        createMarker(lngLat);
        flyToMarker(lngLat);
    }

    onMount(() => {
        map = new mapbox.Map({
            container: container,
            // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
            style: 'mapbox://styles/ericrobskyhuntley/cljrocy4m017701pa1j212ahy',
            center: lngLat,
            zoom: init_zoom,
            bearing: 0,
            projection: 'globe' // starting projection
        });
        const geocoder = new MapboxGeocoder({
            accessToken: mapbox.accessToken,
            mapboxgl: mapbox
        });
        geocoder.addTo('#geocoder');
        geocoder.on('result', e => {
            lngLat = e.result.geometry.coordinates;
            markerFlow(lngLat);
        });
        geocoder.on('clear', () => {
            removeMarker(marker);
        });
        map.on('style.load', () => {
            map.on('click', (e) => {
                // with thanks to...
                // https://stackoverflow.com/questions/56018065/how-to-clear-the-mapbox-geocoder
                geocoder.clear();
                document.getElementsByClassName('mapboxgl-ctrl-geocoder--input')[0].blur();
                lngLat = e.lngLat;
                markerFlow(lngLat);
            });
            map.setFog({
                'color': 'rgba(255, 255, 255, 0.3)',
                'high-color': '#eb0289',
                'horizon-blend': 0.015, // Exaggerate atmosphere (default is .1),
                'space-color': '#feeac3'//, 
                // 'star-intensity': 1
            }); // Set the default atmosphere style
            map.flyTo({
                center: lngLat,
                zoom: final_zoom,
                duration: init_zoom_duration,
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
<div id="info-interface" class="card">
    <div class="card-content">
        <div class="content">
            <div id="geocoder" class="block"/>
            <div class="block">
                {lngLat}
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

    #info-interface {
        position: absolute;
        z-index: 50;
        left: 0px;
        bottom: 0px;
        min-height:50%;
    }
</style>