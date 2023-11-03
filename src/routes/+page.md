---
title: "Home"
---

<script>
    import HeroFullHeight from '$lib/components/HeroFullHeight.svelte';
    import site_data from '$lib/config/instance.json';
    import Map from '$lib/components/Map/Map.svelte';
    /** @type {import('./$types').PageData} */
    export let data
</script>

<HeroFullHeight title={site_data.title} subtitle={site_data.description} authors={site_data.authors} orgs={site_data.orgs} token={data.mapbox_token}/>