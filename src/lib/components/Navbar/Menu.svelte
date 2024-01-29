<script>
    let menuItems = [
      { label: 'Home', link: '#' },
      { label: 'About', link: '#' },
      { label: 'Services', link: '#' },
      { label: 'Contact', link: '#' }
    ];
  </script>
  
  <aside class="menu">
    <p class="menu-label">
      General
    </p>
    <ul class="menu-list">
      {#each menuItems as item}
        <li><a href={item.link}>{item.label}</a></li>
      {/each}
    </ul>
  </aside>
