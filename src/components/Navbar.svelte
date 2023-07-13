<script>
  import Hamburger from './Hamburger.svelte';
  import NavbarItem from './NavbarItem.svelte';
  export let pages;
</script>

<nav class="navbar" style="background-color:#fff0">
      <Hamburger/>
      <div id="navMenu" class="navbar-menu">
        <div class="navbar-start">
        {#if pages}
          {#each Object.entries(pages) as [name, path]}
            <NavbarItem name={name} path={path}/>
          {/each}
        {/if}
        </div>
      </div>
</nav>