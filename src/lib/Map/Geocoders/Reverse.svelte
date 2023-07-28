<script>
    import { getContext, onMount } from 'svelte';
    import { mapbox, key } from '$lib/scripts/utils';

    const { getMap } = getContext(key);
    const map = getMap()

    export let location;
    export let loadingState;

    async function reverseGeocode(lngLat) {
        const endpoint = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'
        const f = 'json'
        const query = `${endpoint}${lngLat.lng},${lngLat.lat}.${f}?country=us&access_token=${mapbox.accessToken}`;
        return await fetch(query)
            .then((d) => {
                return d.json();
            })
            .then((d) => {
                d = d.features[0]
                location.address = d.address;
                location.place_type = d.place_type[0];
                location.text = d.text;
                location.context = d.context;
                loadingState = !loadingState;
            });
    }
    onMount(() => { 
        map.on('click', (e) => {
            reverseGeocode(e.lngLat);
        })
    })
</script>
