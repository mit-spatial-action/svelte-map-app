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
        <ul>
        {#each authors as author}
            <li>
                <a href="{author.url}">{author.name}</a><br>
                <span class="is-italic">{author.affiliation}, {author.location}</span>
            </li>
        {/each}
        </ul>
    </div>
    {/if}
    {#if orgs}
    <div class="column is-one-quarter">
        In collaboration with...
        <ul>
        {#each orgs as org}
            <li>
                <a href="{org.url}">{org.name}</a><br>
                <span class="is-italic">{org.location}</span>
            </li>
        {/each}
        </ul>
    </div>
    {/if}
</div>