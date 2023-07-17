<script>
    import { onDestroy, onMount } from 'svelte';
	import { mapbox } from '../scripts/mapbox';
	import { selectedLocation, loadingState } from '../scripts/stores.js';
    import { fade } from 'svelte/transition';
    import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
    import 'mapbox-gl/dist/mapbox-gl.css';
    import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
    export let projection='globe';
    export let style='mapbox://styles/mapbox/satellite-v9';
    export let init={
        "lngLat": [-120, 42],
        "zoom":[1.8, 3],
        "zoomDur": 3000
    };
    export let resultZoom=10;
    export let resultFlySpeed=2000;
    let loaded = false;
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
    function updateLocation(data, remove = true) {
        (remove) ? removeMarker() : null;
        data.marker = new mapbox.Marker().setLngLat(data.lngLat)
        selectedLocation.update(() => {
            return data
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

    function jsonSearch(json, string) {
        let results;
        results = json.filter(function(entry) {
            return entry.id.includes(string);
        });
        return results[0].text;
    }

    function parseEvents(result){
        let address;
        if (result.place_type.includes("poi")) {
            address = result.properties.address
        } else {
            address = result.address.concat(" ", result.text)
        }
        return {
            "address": address,
            "muni": jsonSearch(result.context, "place"),
            "state": jsonSearch(result.context, "region"),
            "county": jsonSearch(result.context, "district"),
            "zip": jsonSearch(result.context, "postcode"),
            "lngLat": result.geometry.coordinates
        }
    }

    function makeAddFly(data, remove = true){
        updateLocation(data, remove = remove);
        console.log(selectedLocation);
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

    function toggleLoading() {
        loadingState.update(n => !n)
    }

    async function reverseGeocode(e) {
        const lng = e.lngLat.lng;
        const lat = e.lngLat.lat;
        const query_url =`https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?types=poi,address&country=us&access_token=${mapbox.accessToken}`;
        return await fetch(query_url)
            .then((data) => {
                return data.json()
            })
            .then((data) => {
                return data.features[0]
            });
    }

    async function getIntersecting() {
		await fetch('https://public.carto.com/api/v2/sql?format=GeoJSON&q=select%20*%20from%20public.us_states%20where%20%22name%22=%27Massachusetts%27')
            .then((data) => {
                return data.json();
            })
            .then((data) => {
                sourceify(data);
            })
            .then(() => {
                toggleLoading();
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
                mapboxgl: mapbox,
                countries: 'us',
                types: 'address,poi'
            });
            geocoder.addTo('#geocoder');
            geocoder.on('result', (e) => {
                toggleLoading();
                let d = parseEvents(e.result);
                getIntersecting();
                makeAddFly(d);
            });
            map.on('zoomend', () => {
                if (!loaded) {
                    toggleLoading();
                    loaded = true;
                }
            });
            map.on('click', (e) => {
                toggleLoading();
                reverseGeocode(e)
                    .then((data) => {
                        return parseEvents(data);
                    })
                    .then((data) => {
                        makeAddFly(data);
                        geocoder.clear();
                        document.getElementsByClassName('mapboxgl-ctrl-geocoder--input')[0].blur();
                        toggleLoading();
                    })
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
<div class="columns">
    <div class="column is-half is-offset-one-quarter">
    <div id="geocoder" class = "block"/>
    {#if location}
        <div transition:fade id="info-interface" class="card">
            <div class="card-header">
                <div class="card-header-title">
                    {#if location.address}
                        <p>{location.address}</p>
                    {/if}
                    <button class="delete"></button>
                </div>
            </div>
            <div class="card-content">
                <div class="content">
                        {#if location.muni}
                            <p>{location.muni}, {#if location.state}{location.state}{/if} {#if location.zip}{location.zip}{/if}</p>
                        {/if}
                    <div class="block">
                        {#if location.lngLat}
                            {location.lngLat}
                        {/if}
                    </div>
                </div>
            </div>
        </div>
    {/if}
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
        /* position: absolute; */
        z-index: 50;
        /* left: 0px;
        bottom: 0px;
        min-height:50%; */
    }
</style>