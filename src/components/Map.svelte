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
    export let lon;
    export let init_zoom;
    export let final_zoom;

    let container;
    let map;

    onMount(() => {
		map = new mapbox.Map({
            container: container,
            // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
            style: 'mapbox://styles/ericrobskyhuntley/cljrocy4m017701pa1j212ahy',
            center: [lon - 10, lat - 10],
            zoom: init_zoom,
            bearing: 0,
            projection: 'globe' // starting projection
		});
        map.on('style.load', () => {
            map.addControl(
                new MapboxGeocoder({
                    accessToken: mapbox.accessToken,
                    mapboxgl: mapbox
                })
            );
            map.on('click', (e) => {
                new mapbox.Marker()
                    .setLngLat(e.lngLat)
                    .addTo(map);
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

<div bind:this={container}>
    {#if map}
        <slot />
    {/if}
</div>

<style>
	div {
        position: absolute; 
        top: 0; 
        bottom: 0; 
		width: 100%;
		height: 100%;
	}
</style>