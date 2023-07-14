<script>
    import { onDestroy, onMount } from 'svelte';
	import { mapbox } from '../scripts/mapbox';
	import { selectedLocation, loadingState } from '../scripts/stores.js';
    import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
    import 'mapbox-gl/dist/mapbox-gl.css';
    import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
    export let projection='globe';
    export let style='mapbox://styles/mapbox/satellite-v9';
    export let init={
        "lngLat": [-120, 42],
        "zoom":[1.8, 3],
        "zoomDur": 6000
    }
    export let resultZoom=10;
    export let resultFlySpeed=2000;

    let container;
    let map;

    let location;
    selectedLocation.subscribe((data) => {
        location = data;
    });

    function removeMarker() {
        if(typeof location === 'object') {
            location.marker.remove();
        }
    }
    function updateLocation(lngLat, remove = true) {
        (remove) ? removeMarker() : null;
        selectedLocation.update(() => {
            return {
                "marker": new mapbox.Marker().setLngLat(lngLat),
                "lngLat": lngLat
            }
        })
    }

    function addMarker() {
        location.marker.addTo(map)
    }

    function flyToMarker(){
        map.flyTo({
            center: location.lngLat,
            zoom: (map.getZoom() > resultZoom) ? map.getZoom() : resultZoom,
            duration: resultFlySpeed,
            essential: true
        });
    }

    function makeAddFly(lngLat, remove = true){
        updateLocation(lngLat, remove = remove);
        addMarker();
        flyToMarker();
    }

    function sourceify(geojson, id = 'result') {
        if (map.getLayer(id)) {
            map.removeLayer(id);
        }
        if (map.getSource(id)) {
            map.removeSource(id);
        }
        map.addSource(id, {
            'type': 'geojson',
            'data': geojson
        })
        map.addLayer({
            'id': id,
            'type': 'fill',
            'source': id, // reference the data source
            'layout': {},
            'paint': {
            'fill-color': '#0080ff', // blue color fill
            'fill-opacity': 0.5
            }
        });
    }

    async function getIntersecting() {
		await fetch('https://public.carto.com/api/v2/sql?format=GeoJSON&q=select%20*%20from%20public.us_states%20where%20%22name%22=%27Massachusetts%27')
            .then(data => {
                return data.json();
            })
            .then(data => {
                sourceify(data);
                loadingState.update(n => !n)
            })
    }

    onMount(() => {
        map = new mapbox.Map({
            container: container,
            style: style,
            center: init.lngLat,
            zoom: (init.zoom.length === 2) ? init.zoom[0] : init.zoom,
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
                loadingState.update(n => !n)
                getIntersecting();
                makeAddFly(e.result.geometry.coordinates);
            });
            map.on('click', (e) => {
                loadingState.update(n => !n)
                // with thanks to...
                // https://stackoverflow.com/questions/56018065/how-to-clear-the-mapbox-geocoder
                getIntersecting();
                geocoder.clear();
                document.getElementsByClassName('mapboxgl-ctrl-geocoder--input')[0].blur();
                makeAddFly(e.lngLat);
            });
            map.setFog({
                'color': 'rgba(255, 255, 255, 0.3)',
                'high-color': '#eb0289',
                'horizon-blend': 0.015, // default: .1
                'space-color': '#feeac3', 
                // 'star-intensity': 1
            });
            if (init.zoom.length === 2) {
                map.flyTo({
                    center: init.lngLat,
                    zoom: init.zoom[1],
                    duration: init.zoomDur,
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
                {#if location}
                    {location.lngLat}
                {/if}
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