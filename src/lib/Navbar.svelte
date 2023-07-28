<script>
  import Hamburger from './Hamburger.svelte';
  import NavbarItem from './NavbarItem.svelte';
  export let pages;
</script>

<nav class="navbar is-fixed-top">
    <div class="container">
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
    </div>
</nav>