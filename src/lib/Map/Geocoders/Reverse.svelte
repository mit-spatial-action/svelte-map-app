<script>
    import { getContext, onMount } from 'svelte';
    import { mapbox, key } from '$lib/scripts/utils';

    // import InvalidModal from '$lib/Map/InvalidModal.svelte';
    // let locationInvalid = false;

    const { getMap } = getContext(key);
    const map = getMap()

    export let location;

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
                if (d !== undefined) {
                    location.address = d.address;
                    location.place_type = d.place_type[0];
                    location.text = d.text;
                    location.context = d.context;
                } else {
                    location = {marker: location.marker};
                }
            });
    }
    onMount(() => { 
        map.on('click', (e) => {
            reverseGeocode(e.lngLat);
        })
    })
</script>
