<script>
  import Hamburger from '$lib/components/Navbar/Hamburger.svelte';
  import NavbarItem from '$lib/components/Navbar/NavbarItem.svelte';
  import Menu from '$lib/components/Navbar/Menu.svelte';
  import site_data from '$lib/config/instance.json';
  export let pages;
</script>

<nav class="navbar is-fixed-top has-background-light shadow">
      <div class="navbar-brand">
        <div class="navbar-item">
          <img alt="Logo" src="{site_data.logo}"/>
        </div>
        <Hamburger/>
      </div>
      <div id="navMenu" class="navbar-menu has-background-light">
        <div class="navbar-start">
        {#if pages}
          {#each Object.entries(pages) as [name, path]}
            <NavbarItem name={name} path={path}/>
          {/each}
        {/if}
        </div>
      </div>
</nav>
