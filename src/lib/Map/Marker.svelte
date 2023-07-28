<script>
    import { getContext } from 'svelte';
    import { mapbox, key } from '$lib/scripts/utils';

    export let location;
    export let singleMarker = true;
    const { getMap } = getContext(key);
    const map = getMap()

    function removeMarker(location) {
        ('marker' in location) ? location.marker.remove() : null;
    }

    function addMarker(location) {
        let marker = new mapbox.Marker().setLngLat(location.lngLat);
        marker.addTo(map);
        return marker;
    }

    function setLocation(marker) {
        location.marker = marker;
    }

    $: (singleMarker) ? removeMarker(location) : null;
    $: ('lngLat' in location) ? setLocation(addMarker(location)) : null;
</script>