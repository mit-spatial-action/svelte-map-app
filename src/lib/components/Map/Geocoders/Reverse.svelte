<script>
    import { mapbox } from '$lib/scripts/utils';

    export let gcResult;
    export let lngLat;

    async function reverseGeocode(ll) {
        const endpoint = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'
        const f = 'json'
        const query = `${endpoint}${ll.lng},${ll.lat}.${f}?country=us&access_token=${mapbox.accessToken}`;
        let result;
        await fetch(query)
            .then((d) => {
                return d.json();
            })
            .then((d) => {
                if (d.features.length > 0) {
                    d = d.features[0]
                    result = {};
                    result.address = ('address' in d) ? d.address : null;
                    result.place_type = d.place_type[0];
                    result.text = d.text;
                    result.context = d.context;
                    return result;
                } else {
                    return undefined;
                }
            })
            .then((d) => {
                gcResult = d;
            })
    }
    
    $: (lngLat) ? reverseGeocode(lngLat) : null;

</script>
