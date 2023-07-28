<script>
    import { fade } from 'svelte/transition';
    export let location;

    function closeInfo() {
        location.marker.remove();
        location = {}
    }
    
    function contextSearch(context, string) {
        let results;
        try {
            results = context.filter(function(entry) {
                return entry.id.includes(string);
            })[0].text;
        } catch (exception) {
            results = null
        }
        return results;
    }

    function parseEvents(location){
        let address;
        if ('place_type' in location) {
            if (location.place_type.includes("poi")) {
                address = location.properties.address;
            } else if (location.place_type.includes("address")) {
                if (location.address !== undefined) {
                    address = location.address.concat(" ", location.text);
                } else {
                    address = location.text;
                }
            } else {
                address = null;
            }
        } else {
            address = null;
        }
        let c = location.context;
        let data = {
            "address": address,
            "muni": contextSearch(c , "place"),
            "state": contextSearch(c, "region"),
            "county": contextSearch(c, "district"),
            "zip": contextSearch(c, "postcode"),
            "lngLat": location.lngLat,
            "valid": (contextSearch(c, "country") === "United States") ? true : false
        }
        return data
    }

$: (location.context) ? location.parsed = parseEvents(location) : null;
</script>

{#if location.parsed }
<div transition:fade class="columns" id="info-interface" >
    <div class="column is-half is-offset-one-quarter">
        <div class="card">
            <div class="card-header">
                <div class="card-header-title is-justify-content-space-between">
                    <button class="delete is-right" on:click={closeInfo}></button>
                </div>
            </div>
            <div class="card-content">
                <div class="content">
                    {#if location.parsed.address}
                        <p>{location.parsed.address}</p>
                    {/if}
                        {#if location.parsed.muni}
                            <p>{location.parsed.muni}, {#if location.parsed.state}{location.parsed.state}{/if} {#if location.parsed.zip}{location.parsed.zip}{/if}</p>
                        {/if}
                    <div class="block">
                        {#if location.parsed.lngLat}
                            <code>{location.parsed.lngLat.lat.toFixed(3)}</code>, <code>{location.parsed.lngLat.lng.toFixed(3)}</code>
                        {/if}
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
{/if}
<style>
    #info-interface {
        z-index: 50;
        position: absolute;
        bottom: 0;
        width: 100%;
        pointer-events: none;
    }
    #info-interface .card {
        pointer-events: auto;
    }
</style>