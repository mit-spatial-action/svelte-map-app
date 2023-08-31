<script>
    export let status;
    export let title;
    export let priority = false;
    import IconStatus from '$lib/components/IconStatus.svelte';
    import { fade } from 'svelte/transition';
</script>

<div transition:fade = {{ duration: 600}} class="box block has-background-{status ? 'success' : 'danger'} shadow {priority && status ? 'priority' : null}">
    <span class="tag icon-text is-{status ? 'success' : 'danger'} shadow is-small block">
        <IconStatus {status} size='is-small'/>
        {#if status}
        <span>Meets criteria!</span>
        {:else}
        <span>Does not meet criteria!</span>
        {/if}
    </span>
    {#if priority && status}
    <span class="tag icon-text is-{status ? 'success' : 'danger'} shadow is-small block priority">
        <span>Priority area!</span>
    </span>
    {/if}
    <p class="title has-text-white">
        {title}
    </p>
    <slot/>
</div>

<style lang="scss">
.priority {
    outline-style: solid;
    outline-width: 0.3rem;
    outline-offset: -0.3rem;
    outline-color: $primary;
}
</style>