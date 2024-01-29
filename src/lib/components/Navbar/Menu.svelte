<script>
    let menuItems = [
      { label: 'Home', link: '#' },
      { label: 'About', link: '#' },
      { label: 'Services', link: '#' },
      { label: 'Contact', link: '#' }
    ];
    
    function closeNav() {
      document.getElementById("mySidebar").style.width = "0";
      document.getElementById("home-panel").style.marginLeft= "0";
    }
  </script>
  <div id="mySidebar" class="sidebar">
    <a href="javascript:void(0)" class="closebtn" on:click={closeNav}>×</a>
    <a href="#">About</a>
    <a href="#">Services</a>
    <a href="#">Clients</a>
    <a href="#">Contact</a>
  </div>
  <!--<aside class="menu">
    <ul class="menu-list">
      {#each menuItems as item}
        <li><a href={item.link}>{item.label}</a></li>
      {/each}
    </ul>
  </aside> --> 

