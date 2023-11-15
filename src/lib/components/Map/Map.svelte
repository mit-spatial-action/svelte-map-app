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
   // import Evictions from '$lib/config/SampleEvictions.geojson';

    import Device from 'svelte-device-info';
    let mobile;

    export let mapbox_token;
    mapbox.accessToken = mapbox_token;

    export let style =  "mapbox://styles/milanc/clomi1wzb006v01qnahsi5vlc";
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
            map.addSource('sample-evictions', {
                type: 'vector',
                url: "mapbox://milanc.clom235b6a6z52alkp94hemh3-6pw18"
            });
            map.addLayer(
                {
                    id:"evictions", 
                    source: "sample-evictions",
                    'source-layer': "Sample-Evictions",
                    type: "circle",
                    paint: {
                        'circle-radius': [
                            "interpolate",
                            ["linear"],
                            ["get", "evictions"],
                            0, 0,
                            400, 30],
                        'circle-color': '#FF5F05',
                        'circle-opacity': 0.7
                        }
                    }
            )
        })
        map.once('zoomend', () => {
            loadingState = !loadingState
            map.setMinZoom((initZoom.length === 2) ? initZoom[1] : initZoom);
        });
        map.on('style.load', () => {
            map.on('click', (e) => {
                lngLat = e.lngLat;

                var features = map.queryRenderedFeatures(e.point, { layers: ['evictions'] });
                if (!features.length) {
                    return;
                }
                if (typeof map.getLayer('selectedGeom') !== "undefined" ){         
                    map.removeLayer('selectedGeom')
                    map.removeSource('selectedGeom');   
                }
                var feature = features[0];
                map.addSource('selectedGeom', {
                    "type":"geojson",
                    "data": feature.toJSON()
                });
                map.addLayer({
                    "id": "selectedGeom",
                    "type": "circle",
                    "source": "selectedGeom",
                    "paint": {
                        'circle-radius': [
                            "interpolate",
                            ["linear"],
                            ["get", "evictions"],
                            0, 2,
                            400, 35],
                        'circle-color': '#4223FF',
                        'circle-opacity': 0.2
                    }
                });

                
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

</script>
<div id ="map" class={(selected !== undefined && mobile) ? 'non-interactive' : null} bind:this={container}>
    {#if map}
        <RippleLoader bind:loadingState />
        <ReverseGeocoder bind:lngLat bind:gcResult />
        <SearchGeocoder bind:lngLat bind:gcResult bind:selected />
        <SelectedGeometry bind:selected bind:lngLat bind:loadingState/>
    {/if}
</div>



<style>
    .non-interactive {
        pointer-events: none;
    }
</style>