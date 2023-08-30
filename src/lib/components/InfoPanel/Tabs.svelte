<script lang="ts">
    import { slide } from 'svelte/transition';
    import IconStatus from '$lib/components/IconStatus.svelte';
    
    export let items: object;
    export let descState = false;

    let activeTab: string;
    function toggleCriterion(tabValue) {
        if (tabValue === activeTab) {
            activeTab = undefined;
            descState = !descState;
        } else {
            descState = true;
            activeTab = tabValue;
        }
    }
    let source = false;
    function toggleSource() {
        source = !source;
    }
</script>


<div class="buttons">
    {#each items as item}
        <button class="button shadow has-text-centered
            {activeTab === item.desc ? 'is-active' : ''}
            {item.true ? 'is-success' : 'is-danger'}" 
            on:click={toggleCriterion(item.desc)}>
                <span class="icon-text">
                    <IconStatus status={item.true}/>
                    <span>{item.desc}</span>
                </span>
        </button>
    {/each}
</div>
{#each items as item}
    {#if (activeTab == item.desc && descState)}
    <div transition:slide = {{ duration: 200}} 
    class="block box shadow desc-text-box
    {item.true ? 'has-background-success' : 'has-background-danger'}">
        <span class="has-text-white">{@html item.text}</span>
        <div class="block mt-1">
            <button on:click={toggleSource} class="button is-size-7
            {item.true ? 'is-success is-light' : 'is-warning is-light'}">Source</button>
        </div>
        {#if source}
        <div transition:slide = {{ duration: 100}}>
            <span class="has-text-white is-size-7">{@html item.citation}</span>
        </div>
        {/if}
    </div>
    {/if}
{/each}
<slot/>

<style>
    .is-active, .desc-text-box {
        outline-color: white;
        outline-width: 0.1rem;
        outline-offset: -0.1rem;
        outline-style: solid;
    }
</style>