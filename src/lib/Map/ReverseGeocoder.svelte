<script>
    import { getContext } from 'svelte';
    import { mapbox, key } from '$lib/scripts/mapbox';
    const { getMap } = getContext(key)
    const map = getMap()
</script>
