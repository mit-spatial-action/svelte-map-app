<script>
    import { getContext } from 'svelte';
    import { mapbox, key } from '$lib/scripts/utils';
    import site_data from '$lib/config/instance.json';

    const { getMap } = getContext(key)
    const map = getMap()

    export let lngLat;
    export let marker;

    function addMarker(ll) {
        (marker !== undefined) ? marker.remove() : null;
        if (ll !== undefined) {
            marker = new mapbox.Marker({
                    color: site_data.primaryColor
                }).setLngLat(ll);
            marker.addTo(map);
        }
    }

    $: addMarker(lngLat);
</script>