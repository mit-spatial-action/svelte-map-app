<script>
    import HomePanel from '$lib/components/InfoPanel/HomePanel.svelte';
    import site_data from '$lib/config/instance.json';
    import Map from '$lib/components/Map/Map.svelte';
    import '$lib/styles/style.css';


    import { writable } from 'svelte/store';
	import { getContext, setContext } from 'svelte';

    /** @type {import('./$types').PageData} */
    export let data

    const selectedFeature = writable([]);
    setContext('selectedFeature', selectedFeature);

    function openNav() {
      document.getElementById("mySidebar").style.cssText = "width: 250px; border-right: 2px solid #343434";
    }
</script>

<!-- <div class="container "> -->
    <div class="columns is-flex no-scroll is-vcentered">
        <div class="column is-1 is-flex-direction-column shadow is-justify-content-flex-start" id="collapsed-navbar">
            <button class="openbtn" on:click={openNav}>☰</button>  
        </div>
        <div class="column has-background-light homepage shadow" id="left-panel">
            <HomePanel title={site_data.title} subtitle={site_data.description} />
        </div>
        <div class="column has-background-light homepage">
            <Map mapbox_token={data.mapbox_token} />
        </div>
    </div>
