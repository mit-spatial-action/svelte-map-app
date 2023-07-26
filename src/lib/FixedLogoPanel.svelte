<script>
    import data from '../instance.json'
    import LogoImage from './LogoImage.svelte'
    export let backgroundColor = data.backgroundColor
    export let borderColor = data.primaryColor
    export let shadowColor = data.accentColor
</script>

<style>
    .logo {
        position: fixed;
        bottom: 0.5em;
        left: 0.5em;
        z-index: 500;
        background-color: var(--background);
        border: 2px solid var(--border);
        box-shadow: var(--shadow) 0.125em -0.125em 0.25em;
    }
</style>

<div class="logo" style="
    --background: {backgroundColor}; 
    --border: {borderColor};
    --shadow: {shadowColor};">
    {#each data.orgs as org}
    <LogoImage {...org}/>
    {/each}
</div>
