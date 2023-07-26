<script>
    export let authors;
    export let orgs;
</script>

<style>
</style>

<div class="columns">
    {#if authors}
    <div class="column is-one-quarter">
        Built by...
        <ul class="authors-list">
        {#each authors as author}
            <li class="author">
                <span class="name"><a href="{author.url}">{author.name}</a><br></span>
                <span class="location is-italic">{author.affiliation}, {author.location}</span>
            </li>
        {/each}
        </ul>
    </div>
    {/if}
    {#if orgs}
    <div class="column is-one-quarter">
        In collaboration with...
        <ul class="orgs-list">
        {#each orgs as org}
            <li class="org">
                <span class="name"><a href="{org.url}">{org.name}</a><br></span>
                <span class="location is-italic">{org.location}</span>
            </li>
        {/each}
        </ul>
    </div>
    {/if}
</div>