<script>
    import HeroFullHeight from '$lib/components/HeroFullHeight.svelte';   
    import HomePanel from '$lib/components/InfoPanel/HomePanel.svelte';

    import site_data from '$lib/config/instance.json';
    import Map from '$lib/components/Map/Map.svelte';
    /** @type {import('./$types').PageData} */
    export let data

</script>

<div class="container">
    <div class="columns no-scroll">
        <div class="column homepage has-background-light is-half shadow">
            <HomePanel title={site_data.title} subtitle={site_data.description} authors={site_data.authors} orgs={site_data.orgs} />
        </div>
        <div class="column homepage has-background-light is-half">
            <Map mapbox_token={data.mapbox_token} />
        </div>
    </div>
</div>
