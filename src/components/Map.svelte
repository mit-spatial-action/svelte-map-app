<script>
    import { onDestroy, setContext, onMount } from 'svelte';
	import { mapbox, key } from '../scripts/mapbox.js';
    import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
    import 'mapbox-gl/dist/mapbox-gl.css';
    import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
    
    setContext(key, {
        getMap: () => map,
        getLngLat: () => lngLat
    });

    export let lngLat;
    export let projection='globe';
    export let mapboxStyle='mapbox://styles/mapbox/satellite-v9';
    export let initZoom=[1.8, 3];
    export let initZoomDur=6000;
    export let resultZoom=10;
    export let resultFlySpeed=2000;

    let container;
    let map;
    let marker;

    function removeMarker() {
        if(typeof marker !== 'undefined') {
            marker.remove();
        }
    }
    function createMarker() {
        marker = new mapbox.Marker()
            .setLngLat(lngLat)
        marker.addTo(map);
    }

    function flyToMarker(){
        let zoom = (map.getZoom() > resultZoom) ? map.getZoom() : resultZoom;
        map.flyTo({
            center: lngLat,
            zoom: zoom,
            duration: resultFlySpeed,
            essential: true
        });
    }

    function removeCreateFly(){
        removeMarker();
        createMarker();
        flyToMarker();
    }

    onMount(() => {
        map = new mapbox.Map({
            container: container,
            style: mapboxStyle,
            center: lngLat,
            zoom: (initZoom.length === 2) ? initZoom[0] : initZoom,
            bearing: 0,
            projection: projection
        });
        map.on('style.load', () => {
            const geocoder = new MapboxGeocoder({
                accessToken: mapbox.accessToken,
                mapboxgl: mapbox
            });
            geocoder.addTo('#geocoder');
            geocoder.on('result', e => {
                lngLat = e.result.geometry.coordinates;
                removeCreateFly();
            });
            geocoder.on('clear', () => {
                removeMarker(marker);
            });
            map.on('click', (e) => {
                // with thanks to...
                // https://stackoverflow.com/questions/56018065/how-to-clear-the-mapbox-geocoder
                geocoder.clear();
                document.getElementsByClassName('mapboxgl-ctrl-geocoder--input')[0].blur();
                lngLat = e.lngLat;
                removeCreateFly();
            });
            map.setFog({
                'color': 'rgba(255, 255, 255, 0.3)',
                'high-color': '#eb0289',
                'horizon-blend': 0.015, // Exaggerate atmosphere (default is .1),
                'space-color': '#feeac3'//, 
                // 'star-intensity': 1
            }); // Set the default atmosphere style
            if (initZoom.length === 2) {
                map.flyTo({
                    center: lngLat,
                    zoom: initZoom[1],
                    duration: initZoomDur,
                    essential: true // this animation is considered essential with respect to prefers-reduced-motion
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