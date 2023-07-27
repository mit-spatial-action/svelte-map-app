<script>
    import { getContext, onMount } from 'svelte';
    import { mapbox, key } from '$lib/scripts/utils';

    const { getMap } = getContext(key);
    const map = getMap()

    export let location;

    async function reverseGeocode(lngLat) {
        const endpoint = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'
        const f = 'json'
        const query = `${endpoint}${lngLat.lng},${lngLat.lat}.${f}?country=us&access_token=${mapbox.accessToken}`;
        return await fetch(query)
            .then((d) => {
                return d.json()
            })
            .then((d) => {
                d = d.features[0].context;
                (d !== undefined) ? location.result = d : null;
            });
    }
    onMount(() => { 
        map.on('click', (e) => {
            reverseGeocode(e.lngLat);
        })
    })
</script>
