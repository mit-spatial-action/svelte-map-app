<script>
    import { mapbox } from '$lib/scripts/utils';

    export let selected;
    export let lngLat;
    export let loadingState;

    async function addGeometry(ll) {
        const endpoint = 'https://api.mapbox.com/v4/milanc.clom235b6a6z52alkp94hemh3-6pw18/tilequery/'
        const f = 'json'
        const query = `${endpoint}${ll.lng},${ll.lat}.${f}?access_token=${mapbox.accessToken}`;
        loadingState = !loadingState;
        await fetch(query)
            .then((d) => {
                return d.json();
            })
            .then((d) => {
                return (d.features.length > 0) ? d.features[0].properties : undefined;
            })
            .then((d) => {
                selected = d;
                loadingState = !loadingState;
            })
    }
    
    $: (lngLat) ? addGeometry(lngLat) : null;
</script>