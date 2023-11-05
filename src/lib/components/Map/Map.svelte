<script>
    import { onDestroy, onMount, setContext } from 'svelte';
    import ForwardGeocoder from '$lib/components/Map/Geocoders/Forward.svelte';
    import SearchGeocoder from '$lib/components/Map/Geocoders/SearchCombined.svelte';
    import ReverseGeocoder from '$lib/components/Map/Geocoders/Reverse.svelte';
    import SelectedGeometry from '$lib/components/Map/SelectedGeometry.svelte';
    import Marker from '$lib/components/Map/Marker.svelte';
    //import InfoPanel from '$lib/components/InfoPanel/InfoPanel.svelte';
    import RippleLoader from '$lib/components/RippleLoader.svelte';
    import site_data from '$lib/config/instance.json';

    // @import '$lib/styles/_variables.scss';

    import 'mapbox-gl/dist/mapbox-gl.css';

    import { mapbox, key } from '$lib/scripts/utils';

    import Device from 'svelte-device-info';
    let mobile;

    export let mapbox_token;
    mapbox.accessToken = mapbox_token;

    export let style =  "mapbox://styles/ericrobskyhuntley/cljrocy4m017701pa1j212ahy";
    export let projection = 'globe';
    export let initLngLat = site_data.map.init.lngLat;
    initLngLat = new mapbox.LngLat(initLngLat[0], initLngLat[1])
    export let initZoom = site_data.map.init.zoom;
    export let initZoomDur  = 3000;
    
    export let maxBounds = [
        [-179,19], 
        [-67,72]
    ]

    export let resultZoom = 10;
    export let resultFlySpeed = 2000;
    
    let container;
    let map;

    let lngLat;
    let gcResult;
    let selected;
    let marker;
    
    let loadingState = true;

    setContext(key, {
        getMap: () => map
    });

    function flyToLngLat(lngLat){
        map.flyTo({
            center: lngLat,
            zoom: (map.getZoom() > resultZoom) ? map.getZoom() : resultZoom,
            duration: resultFlySpeed,
            essential: true
        });
    }

    $: (lngLat) ? flyToLngLat(lngLat) : null;

    onMount(() => {
        mobile = Device.isPhone;
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
            map.addSource('adders', {
                type: 'vector',
                url: 'mapbox://ericrobskyhuntley.3tqai42w'
            });
            map.addSource('choropleth', {
                type: 'vector',
                url: 'mapbox://ericrobskyhuntley.b3m8uynm'
            })
            map.addLayer(
                {
                    id: 'choropleth-fill',
                    type: 'fill',
                    source: 'choropleth',
                    'source-layer': 'resonant_overlay-3wot0h',
                    paint: {
                        'fill-opacity': {
                            property: 'how_many',
                            stops: [[1, 0.5], [2, 1]]
                        },
                        'fill-color': "#177E8A",
                        'fill-outline-color': 'white',
                    }
                }
            )
            map.addLayer(
                {
                    id: "adders-shadow",
                    source: "adders",
                    "source-layer": "adders_dissolved-2x5v3w",
                    type: "line",
                    "line-join": "bevel",
                    "line-cap": "round",
                    paint: {
                        "line-color": "#000000",
                        "line-opacity": 1,
                        "line-width": 2,
                        "line-translate": [2,2]
                    }
                }
            )
            map.addLayer(
                {
                    id: 'adders-outlines',
                    source: 'adders',
                    'source-layer': 'adders_dissolved-2x5v3w',
                    type: 'line',
                    paint: {
                        'line-color': '#f0a800',
                        'line-width': 2,
                    }
                }
            )
            map.addLayer(
                {
                    id: 'adders-fill',
                    type: 'fill',
                    source: 'adders',
                    'source-layer': 'adders_dissolved-2x5v3w',
                    paint: {
                        'fill-color': '#f0a800'
                    }
                }
            )
            map.moveLayer('choropleth-fill', 'waterway');
            map.setPaintProperty('adders-fill', 'fill-opacity', [
                'interpolate',
                ['exponential', 0.5],
                ['zoom'],
                initZoom[1],
                0,
                resultZoom,
                0.1
            ])
            map.setPaintProperty('adders-shadow', 'line-width', [
                'interpolate',
                ['linear', 0.5],
                ['zoom'],
                initZoom[1],
                1,
                resultZoom,
                3
            ])
        })
        map.once('zoomend', () => {
            loadingState = !loadingState
            map.setMinZoom((initZoom.length === 2) ? initZoom[1] : initZoom);
        });
        map.on('style.load', () => {
            map.on('click', (e) => {
                lngLat = e.lngLat;
            })
            map.setFog({
                range: [9,20],
                color: '#f0a800',
                'high-color': '#d63088',
                'horizon-blend': 0.02, // default: .1
                'space-color': '#000000', 
                'star-intensity': 0.1
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

   // document.getElementById('search-geocoder').appendChild(search-geocoder.onAdd(map));

</script>
<div id ="map" class={(selected !== undefined && mobile) ? 'non-interactive' : null} bind:this={container}>
    {#if map}
        <RippleLoader bind:loadingState />
        <Marker bind:lngLat bind:marker />
        <ReverseGeocoder bind:lngLat bind:gcResult />
        <ForwardGeocoder bind:lngLat bind:gcResult bind:selected />
        <SearchGeocoder bind:lngLat bind:gcResult bind:selected />
        <SelectedGeometry bind:selected bind:lngLat bind:loadingState/>
    {/if}
</div>



<style>
    .non-interactive {
        pointer-events: none;
    }
</style>