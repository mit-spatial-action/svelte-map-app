<script>
    let menuItems = [
      { label: 'Home', link: '#' },
      { label: 'About', link: '#' },
      { label: 'Services', link: '#' },
      { label: 'Contact', link: '#' }
    ];

    function closeNav() {
      document.getElementById("mySidebar").style.cssText = "width: 0; border-right: 0.5px";
    }
  </script>

  <div id="mySidebar" class="sidebar">
    <p href="javascript:void(0)" class="closebtn" on:click={closeNav}>×</p>
    <a href="#">Map</a>
    <a href="#">Eviction Statistics</a>
    <a href="#">See a Random Evictor</a>
    <a href="#">Gallery</a>
    <a href="#">Links & Info</a>
    <a href="#">About</a>
    <a href="#">Contact</a>
  </div>
  <!--<aside class="menu">
    <ul class="menu-list">
      {#each menuItems as item}
        <li><a href={item.link}>{item.label}</a></li>
      {/each}
    </ul>
  </aside> --> 

