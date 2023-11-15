<script>
    import LowIncome from '$lib/components/InfoPanel/LowIncome.svelte';
    import EnergyCommunities from '$lib/components/InfoPanel/EnergyCommunities.svelte';
    import Tabs from '$lib/components/InfoPanel/Tabs.svelte';

    import { slide } from 'svelte/transition';

    export let gcResult;
    export let selected;
    export let marker;

    //From Low income Component
    $: items = [
            {
                desc: "Top Statistics",
             },
            {
                desc: "Random Evictor",
            },
            {
                desc: "Eviction Primer",
            },
            {
                desc: "What happeneds in court?",
            },
            {
                desc: "Reports",
            },
            {
                desc: "Gallery",
        ]


    function closeInfo() {
        marker.remove();
        add = undefined;
        selected = undefined;
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

    function parseContext(gcr){
        let address;
        if ('place_type' in gcr) {
            if (gcr.place_type.includes("poi")) {
                address = gcr.address;
            } else if (gcr.place_type.includes("address")) {
                if (gcr.address !== null ) {
                    address = gcr.address.concat(" ", gcr.text);
                } else {
                    address = gcr.text;
                }
            } else {
                address = null;
            }
        } else {
            address = null;
        }
        let c = gcr.context;
        return {
            "address": address,
            "muni": contextSearch(c , "place"),
            "state": contextSearch(c, "region"),
            "county": contextSearch(c, "district"),
            "zip": contextSearch(c, "postcode")
        }
    }

$: add = (gcResult) ? parseContext(gcResult) : undefined;

</script>

{#if add || selected }
<div class="info-box columns p-3">
    <div transition:slide = {{ duration: 500, axis: 'y'}} class="column is-two-fifths">
        <div id="address" class="box block has-background-grey-darker shadow sticky-top">
            <button on:click={closeInfo} class="button span tag icon-text is-danger shadow is-medium block">
                <span>Close</span>
            </button>
                <!-- <div class="card-header-title is-justify-content-space-between">
                    <button class="button is-right is-danger" on:click={closeInfo}>Close</button>
                </div> -->
                <div class="title has-text-white">
                    {#if add.address}
                        <p>{add.address}</p>
                    {/if}
                    {#if add.muni}
                        <p>{add.muni}, {#if add.state}{add.state}{/if} {#if add.zip}{add.zip}{/if}</p>
                    {/if}
                </div>
        </div>
        {#if selected}
        <div>
            <LowIncome
                data={selected}
            />
            <EnergyCommunities
                data={selected}
            />
        </div>
        {/if}
    </div>
</div>
{:else}
<div class="info-box columns p-3">
    <div transition:slide = {{ duration: 500, axis: 'y'}} class="column is-two-fifths">
        <div id="address" class="box block has-background-grey-darker shadow sticky-top title has-text-white">

        <p>MASS EVICTIONS</p>
        <br/>
        <h6>A record of Massachusetts court eviction filings from 02/2019 to 09/2022</h6>
        <br/>

        <Tabs {items}/>
        
        
        </div>
        
    </div>
    
</div>
{/if}
<style>
    #address {
        z-index: 40;
    }
    
    div {
        z-index: 20;
    }
</style>