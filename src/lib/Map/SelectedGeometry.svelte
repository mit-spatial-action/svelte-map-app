<script>
    import { getContext } from 'svelte';
    import { mapbox, key } from '$lib/scripts/utils';
    // const { URL, URLSearchParams } = require('url');

    export let location;
    // Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))


    const { getMap } = getContext(key);
    const map = getMap()

    function removeLayer(id = 'result') {
        if (map.getLayer(id)) {
            map.removeLayer(id);
        }
        if (map.getSource(id)) {
            map.removeSource(id);
        }
    }

    function sourceify(geojson, id = 'result') {
        removeLayer()
        map.addSource(id, {
            'type': 'geojson',
            'data': geojson
        })
        map.addLayer({
            'id': id,
            'type': 'fill',
            'source': id,
            'layout': {},
            'paint': {
            'fill-color': '#0080ff',
            'fill-opacity': 0.5
            }
        });
    }


    async function addGeometry(location) {
        const endpoint = new URL('http://localhost:8000/tract?');
        console.log(location);
        await fetch(endpoint + new URLSearchParams({
            lng: location.lngLat.lng,
            lat: location.lngLat.lat,
            format: "json",
        }))
            .then((d) => {
                return d.json();
            })
            .then((d) => {
                sourceify(d);
            })
    }
    
    $: ('lngLat' in location) ? addGeometry(location) : null;
</script>