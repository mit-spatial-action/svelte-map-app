<script>
    import WelcomeButton from '$lib/components/WelcomeButton.svelte';
    import { onMount } from 'svelte';
    import { slide, fade } from 'svelte/transition';

    export let authors;
    export let orgs;

    export let title = "Title";
    export let subtitle = "Longer description";
    let loadState = false;
    onMount(() => loadState = true);
</script>

{#if loadState}
<section transition:fade = {{ duration: 1000}} class="hero hero-solar is-fullheight-with-navbar">
    <div class="container">
        <div class="hero-body">
            <div class="">
            <p transition:slide = {{ duration: 800}} class="title p-3 has-background-dark has-text-primary is-size-1 shadow">
                {title}
            </p>
            <p class="subtitle p-3 mt-1 has-background-dark has-text-primary is-size-2 shadow">
                {subtitle}
                
            </p>
            <div class="columns">
                <div class="column">
                    <WelcomeButton/>
                </div>
                <div class="column">
                    <div class="has-background-dark p-3 has-text-white mb-1 shadow">
                        <span class="is-italic">This tool is provided by...</span>
                        <ul>
                            {#each orgs as org}
                                <li><a href="{org.url}">{org.name}</a>{#if org.description}, {org.description}.{/if}</li>
                            {/each}
                        </ul>
                    </div>
                    <div class="has-background-dark p-3 has-text-white shadow">
                        <span class="is-italic">Built by...</span>
                        <ul>
                            {#each authors as author}
                                <li><a href="{author.url}">{author.name}</a>, {author.role}</li>
                            {/each}
                        </ul>
                    </div>
                </div>
            </div>
            </div>
        </div>
    </div>
</section>
{/if}